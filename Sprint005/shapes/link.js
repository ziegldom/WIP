function link() {
    if (sourceElement === null) {
        console.log("Click on the source shape.");
        paper.once('cell:pointerup', function (cellView, evt, x, y) {
            sourceElement = cellView.model;
            console.log("Source shape selected");
            console.log("Click on the target shape.");
            paper.on('cell:pointerup', handleTargetSelection);
            });
        }
    }

function handleTargetSelection(cellView, evt, x, y){
    const targetElement = cellView.model;
    createLink(sourceElement, targetElement);
    sourceElement = null;
    paper.off('cell:pointerup', handleTargetSelection);
}

function createLink(source, target) {
    const triggerLabel = prompt("Enter Trigger");
    const guardLabel = prompt("Enter Guard");
    const actionLabel = prompt("Enter Action");

const link = new joint.shapes.standard.Link({
    attrs: {
        line: {
            strokeWidth: 5,
        }
    },
});


const labels = [
    { text: ('')+triggerLabel, distance: 0.25 },
    { text: ('[')+guardLabel+(']'), distance: 0.5 },
    { text: ('/')+actionLabel, distance: 0.75 }
];

labels.forEach((labelData) => {
    const label = link.appendLabel({
        attrs: {
            text: {
                text: labelData.text,
            },
        },
        position: {
            distance: labelData.distance,
        },
    });

    label.on('link:pointerdblclick', (evt) => {
        evt.preventDefault();
        const currentText = label.attr('text/text');
        const newText = prompt('Edit label:', currentText);

        if (newText !== null) {
            label.attr('text/text', newText);
        }
    });
});

link.source(source);
link.target(target);

link.attr('connector/strokeWidth', 15);
link.attr('vertices/strokeWidth', 15);


link.addTo(graph);
}