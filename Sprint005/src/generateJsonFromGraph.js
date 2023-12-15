function generateJsonFromGraph(graph) {
    const json = [];
 
    const elements = graph.getElements();
 
    elements.forEach(element => {
        if (element.get('type') === 'standard.Circle' && element.attr('isStarting')) {
             const startJson = generateComposite(element);
             json.push(startJson);
         }
     });
 
    return json;
    }

 function generateComposite(element) {
    const composite = {
        type: element.get('type') === 'standard.Circle' ? 'Start' : 'State',
        prompt: element.get('type') === 'standard.Circle' ? element.attr('prompt') : undefined,
        starter: element.attr('starter'),
        ...(element.get('type') === 'standard.Circle' && element.attr('isStarting') ? { isStarting: true } : {}),
        transitions: [],
    };

    const outgoingLinks = graph.getConnectedLinks(element, { outbound: true });

    outgoingLinks.forEach(link => {
        const targetElement = link.getTargetElement();

        const triggerLabel = link.labels()[0].attrs.text.text.replace('Trigger: ', '');
        const guardLabel = link.labels()[1].attrs.text.text.replace('['+']', '');
        const actionLabel = link.labels()[2].attrs.text.text.replace('/', '');

        if (targetElement.get('type') === 'standard.Circle' && targetElement.attr('isFinal')) {
            const finalState = {
                type: 'finalState',
                name: targetElement.attr('label/text'),
            };

            composite.transitions.push({
                type: 'link',
                trigger: triggerLabel,
                guard: guardLabel,
                action: actionLabel,
                subsequentState: [finalState],
            });
        } else {
            const transition = {
                type: 'link',
                trigger: triggerLabel,
                guard: guardLabel,
                action: actionLabel,
                subsequentState: generateComposite(targetElement),
            };

            composite.transitions.push(transition);
        }
    });

    return composite;
}
