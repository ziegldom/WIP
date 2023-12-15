const namespace = joint.shapes;
const toolbar = document.getElementById("toolbar");
const graph = new joint.dia.Graph({}, { cellNamespace: namespace});
const paper = new joint.dia.Paper({
    el: document.getElementById('canvas'),
    model: graph,
    height: 800,
    width: 700,
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

paper.on('element:pointerdblclick', (cellView, evt, x, y) => {
    const cell = cellView.model;

if (cell.attr('label/text')) {
        const currentLabel = cell.attr('label/text');
        const newLabel = prompt('Enter a new Prompt:', currentLabel);
        if (newLabel !== null) {
            cell.attr('label/text', newLabel);
        }
    }
});



function startState() {
        const start = new joint.shapes.standard.Circle();
        startConstructor(start, i);
        start.addTo(graph);
        i++;
        };

function finalState() {
        const final = new joint.shapes.standard.Circle();
        finalConstructor(final, i);
        final.addTo(graph);
        i++;
        }

function standardState() {
        const state = new joint.shapes.standard.Rectangle();
        stateConstructor(state, i);
        state.addTo(graph);
        i++;
        }

function clearGraph(){
    graph.clear();
    document.getElementById("startState").disabled = false;
    document.getElementById("finalState").disabled = false;
    }

function downloadJson(){
    const jsonStructure = generateJsonFromGraph(graph);
    console.log("jsonStructure: "+JSON.stringify(jsonStructure, null, 2));
    }
