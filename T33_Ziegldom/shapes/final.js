function finalConstructor(final, i) {
    final.position(300, 300);
    final.resize(100, 50);
    final.prop('id', i);
    final.attr('body/fill', 'white');
    final.attr('body/strokeWidth', 7);
    final.attr('label/text', '');
    final.attr('isFinal', true);

    const finalJson = {
        type: "finalState",
        name: "Final State",
    };

    console.log(finalJson);
};