function stateConstructor(state, i) {
    var label = "This is the State's Prompt \n if you wish to change it, double click on this state.";
    state.position(300, 100);

    state.resize('calc(w)', 'calc(h)');

    state.prop('id', i);
    state.attr({
        body: {
            rx: 5,
            ry: 5,
            strokeWidth: 1,
            ref: 'label',
        },
        label: {
            text: label,
            textAnchor: 'right',
            textVerticalAnchor: 'top'
        },
        isStarting: false
    });

    const labelText = label;
    const stateJson = {
        type: "State",
        name: labelText,
        transitions: [],
    };

    console.log(stateJson);
}