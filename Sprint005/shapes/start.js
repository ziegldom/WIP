function startConstructor(start, i) {
    start.position(100, 100);
    start.resize(100, 50);
    start.prop('id', i);
    start.attr({
        body: {
            fill: 'black'
        },
        label: {
            text: "",
            color: "black"
        },
        isStarting: true
    });

    const promptLabel = prompt("Enter Prompt:");
    const starterLabel = prompt("Enter Starter:");

    start.attr('prompt', promptLabel);
    start.attr('starter', starterLabel);

    const promptText = new joint.shapes.basic.Text({
        position: { x: start.position().x, y: start.position().y - 20 },
        size: { width: 100, height: 20 },
        attrs: {
            text: {
                text: promptLabel,
                fill: 'black',
                'font-size': 10,
            },
        },
    });

    graph.addCell([start, promptText]);

    const startJson = {
        type: "Start",
        prompt: promptLabel,
        starter: starterLabel,
        isStarting: true,
        transitions: [],
    };

    console.log(startJson);
};