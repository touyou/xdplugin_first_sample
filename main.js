/*
 * Sample plugin scaffolding for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */


const { Line, Rectangle, Path, Text, Color } = require("scenegraph");
const commands = require("commands");

// MARK: Helper

function randomColor() {
    const hexValues = ['00', '33', '66', '99', 'CC', 'FF'];
    const color = "#" + Array.from({ length: 3 }, _ => hexValues[Math.floor(Math.random() * hexValues.length)]).join("");
    return color;
}

function pointOfCircle(radius, angle) {
    const radians = angle * 2. * Math.PI / 360.;
    const xcoord = radius * Math.cos(radians);
    const ycoord = radius * Math.sin(radians);
    return xcoord + "," + ycoord
}

// MARK: Rectangle

function rectangleHandlerFunction(selection) {

    const newElement = new Rectangle();
    newElement.width = 100;
    newElement.height = 50;
    newElement.fill = new Color("Purple");

    selection.insertionParent.addChild(newElement);
    newElement.moveInParentCoordinates(100, 100);
}

// MARK: Line

const lineData = [
    { startX: 100, startY: 110, endX: 210, endY: 233 },
    { startX: 210, startY: 233, endX: 320, endY: 156 },
    { startX: 320, startY: 156, endX: 400, endY: 300 },
    { startX: 400, startY: 300, endX: 500, endY: 120 },
]

function createLinesCommand(selection) {
    let lines = [];
    lineData.forEach(data => {
        const line = new Line();

        line.setStartEnd(
            data.startX,
            data.startY,
            data.endX,
            data.endY
        );

        line.strokeEnabled = true;
        line.stroke = new Color(randomColor());
        line.strokeWidth = 3;

        lines.push(line);

        selection.editContext.addChild(line);
    });

    selection.items = lines;
    commands.group();
}

// MARK: Pie Chart

function createWedge(selection, radius, startAngle, endAngle, color) {
    const startPt = pointOfCircle(radius, startAngle);
    const endPt = pointOfCircle(radius, endAngle);
    const pathData = `M0,0 L${startPt} A${radius},${radius},0,0,1,${endPt} L0,0`;
    const wedge = new Path();
    wedge.pathData = pathData;
    wedge.fill = new Color(color);
    wedge.translation = { x: radius, y: radius };
    selection.insertionParent.addChild(wedge);
}

function createPieChartCommand(selection) {
    createWedge(selection, 100, 0, 90, "red");
    createWedge(selection, 100, 90, 135, "blue");
    createWedge(selection, 100, 135, 225, "yellow");
    createWedge(selection, 100, 225, 360, "purple");
}

// MARK: Styled Text

function createStyledTextHandlerFunction(selection) {
    const node = new Text();

    const textData = [
        { text: "This ", color: "red" },
        { text: "is ", color: "orange" },
        { text: "some ", color: "yellow" },
        { text: "ra", color: "green" },
        { text: "in", color: "blue" },
        { text: "bow ", color: "indigo" },
        { text: "text", color: "violet" },
    ];

    node.text = textData.map(item => item.text).join("");
    node.styleRanges = textData.map(item => ({
        length: item.text.length,
        fill: new Color(item.color)
    }));
    node.fontSize = 24;

    selection.insertionParent.addChild(node);
    node.moveInParentCoordinates(20, 50);
}

module.exports = {
    commands: {
        createRectangle: rectangleHandlerFunction,
        createLinesCommand,
        createPieChartCommand,
        "createStyledTextCommand": createStyledTextHandlerFunction
    }
};
