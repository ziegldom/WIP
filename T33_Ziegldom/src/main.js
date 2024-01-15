const namespace = joint.shapes;
const toolbar = document.getElementById("toolbar");
const graph = new joint.dia.Graph({}, {
    cellNamespace: namespace
});
const paper = new joint.dia.Paper({
    el: document.getElementById('canvas'),
    model: graph,
    height: 900,
    width: 900,
    gridSize: 2.5,
    drawGrid: true,
    background: {
        color: 'lightGray'
    },
    cellViewNamespace: namespace
});

var start = new joint.shapes.standard.Circle();
var final = new joint.shapes.standard.Circle();
var i = 1;
let sourceElement = null;

const boundaryTool = new joint.elementTools.Boundary();
const removeButton = new joint.elementTools.Remove();
const toolsView = new joint.dia.ToolsView({
    tools: [boundaryTool, removeButton]
});

function startState() {
    const start = new joint.shapes.standard.Circle();
    startConstructor(start, i);
    start.addTo(graph);
    var startView = start.findView(paper);
    startView.addTools(toolsView);
    startView.hideTools();
    i++;
};

function finalState() {
    const final = new joint.shapes.standard.Circle();
    finalConstructor(final, i);
    final.addTo(graph);
    var finalView = final.findView(paper);
    finalView.addTools(toolsView);
    finalView.hideTools();
    i++;
}

function standardState() {
    const state = new joint.shapes.standard.Rectangle();
    stateConstructor(state, i);
    state.addTo(graph);
    var stateView = state.findView(paper);
    stateView.addTools(toolsView);
    stateView.hideTools();
    i++;
}

paper.on('element:pointerclick', function (elementView) {
    elementView.showTools();
})

paper.on('blank:pointerclick', function (elementView, x, y) {
    paper.hideTools();
});

paper.on('element:pointerdblclick', (elementView, evt, x, y) => {
    const cell = elementView.model;

    if (cell.attr('label/text')) {
        const currentLabel = cell.attr('label/text');
        const newLabel = prompt('Enter a new Prompt:', currentLabel);
        if (newLabel !== null) {
            cell.attr('label/text', newLabel);
        }
    }
});

function clearGraph() {
    graph.clear();
}

function downloadJson() {
    var jsonStructure = JSON.stringify(generateJsonFromGraph(graph), null, 2);
    var jsonDownload = new Blob([jsonStructure], {
        type: 'text/json;charset=utf-8'
    });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(jsonDownload);
    link.target = "_blank";
    link.download = ("Graph.json");
    link.click();
    console.log(jsonStructure);

}