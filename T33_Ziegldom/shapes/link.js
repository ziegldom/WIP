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

function handleTargetSelection(cellView, evt, x, y) {
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


    const labels = [{
            text: ('') + triggerLabel,
            distance: 0.25
        },
        {
            text: ('[') + guardLabel,
            distance: 0.5
        },
        {
            text: ('/') + actionLabel,
            distance: 0.75
        }
    ];

    labels.forEach((labelData) => {
        const label = link.appendLabel({
            attrs: {
                text: {
                    text: labelData.text,
                    'ref-x': 0.5,
                    'ref-y': 0.5,
                    'x-alignment': 'middle',
                    'y-alignment': 'middle',
                    cursor: 'pointer',
                },
            },
            position: {
                distance: labelData.distance,
            },
        });
    });

    link.source(source);
    link.target(target);

    link.attr('connector/strokeWidth', 15);
    link.attr('vertices/strokeWidth', 15);

    link.addTo(graph);

    var boundaryTool = new joint.linkTools.Boundary();
    var removeButton = new joint.linkTools.Remove();
    var toolsView = new joint.dia.ToolsView({
        tools: [boundaryTool, removeButton]
    });
    var linkView = link.findView(paper);
    linkView.addTools(toolsView);
    linkView.hideTools();

    paper.on('link:mouseenter', function (linkView) {
        linkView.showTools();
    })

    paper.on('link:mouseleave', function (linkView) {
        linkView.hideTools();
    });

}