function stateConstructor(state, i) {
    state.position(200, 200);
    state.resize(100, 50);
    state.prop('id', i);
    state.attr({
        body: {
            rx: 5,
            ry: 5,
            strokeWidth: 2
        },
        label: {
            text: 'State'
        },
        isStarting: false
    });

const labelText = state.attr('label/text');
const stateJson = {
    type:"State",
    prompt:labelText,
    transitions: [],
    };

console.log(stateJson);
}
