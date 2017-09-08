var yPoint;
var xPoint;

var yTicks;
var yTickSpacing;

var xTicks;
var xTickSpacing;

function getStringsWidth(canvas, arrayStrings){
	var maxWidth = 0;
	var ctx	= canvas.getContext("2d");
	ctx.font="10px Arial";

	if (!Array.isArray(arrayStrings)) {
		for (var i = 1; i <= data.series.data.length; i++){
			var seriesData = data.series.data[i - 1];

			var cWidth = ctx.measureText(seriesData.text).width;
			if (cWidth > maxWidth) {
				maxWidth = cWidth;
			}
		}
	} else {
		arrayStrings.forEach(function(str, index){
			var cWidth = ctx.measureText(str).width;
			if (cWidth > maxWidth) {
				maxWidth = cWidth;
			}
		});
	}

	return maxWidth;
}

function drawCircle(canvas, x, y, r, colorString, ellipseModeCentered) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();

	if (ellipseModeCentered) {
		x += r;
		y += r;
	}

	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fillStyle = (typeof colorString === 'string') ? colorString : "#FFFFFF";
	ctx.fill();
}

function drawText(canvas, text, x, y, fontSize, alignment) {
	var ctx 		= canvas.getContext("2d");
	ctx.textAlign 	= alignment ? alignment : "start";
	ctx.font 		= (typeof fontSize === 'number') ? fontSize + "px Arial" : "12px Arial";
	ctx.fillStyle 	= "#000000";
	ctx.fillText(text, x, y);
	ctx.textAlign	= "start";
}

function drawLine(canvas, x1, y1, x2, y2) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function rotate(canvas, rotation){
	var ctx = canvas.getContext("2d");
	ctx.rotate(rotation);
}

function drawGraph(id, data, customWidth, customHeight){
	var wrapper = document.getElementById(id);

	var customWidth		= Number.isInteger(customWidth) 	? customWidth 	: wrapper.clientWidth;
	var customHeight	= Number.isInteger(customHeight) 	? customHeight 	: wrapper.clientHeight;

	var newCanvas = document.createElement('canvas');
	newCanvas.setAttribute('width', customWidth);
	newCanvas.setAttribute('height', customHeight);
	newCanvas.setAttribute('id', 'canvas');
	wrapper.appendChild(newCanvas);

	var canvas	= document.getElementById("canvas");

	var legendHeight = 25;
	var legendXOffset = customWidth * 0.3;
	var legendWidth = getStringsWidth(canvas);

	drawCircle(canvas, legendXOffset, 10, 4, "#009700");
	drawCircle(canvas, legendXOffset + 60, 10, 4, "#FF0000");

	drawText(canvas, 'Active', legendXOffset + 10, 15, 12);
	drawText(canvas, 'Inactive', legendXOffset + 70, 15, 12);


	yOffset = customHeight * 0.8;
	xOffset = 10 + getStringsWidth(canvas);

	yTicks = data.series.data.length;
	yTickSpacing = ((yOffset - legendHeight) / (yTicks + 1));

	xTicks = data.series.x.length;
	xTickSpacing = (customWidth - xOffset) / (xTicks + 1);

	// first we draw the axis
	drawLine(canvas, xOffset, legendHeight, xOffset, yOffset);
	drawLine(canvas, xOffset, yOffset, customWidth, yOffset);

	// placing the X Axis ticks
	for (var i = 1; i <= xTicks; i++){
		drawLine(canvas, (i * xTickSpacing) + xOffset, yOffset, (i * xTickSpacing) + xOffset, yOffset + 5);
	}


	// placing the Y Axis ticks
	for (i = 1; i <= yTicks; i++){
		var newY = yOffset - (i * yTickSpacing);
		drawLine(canvas, xOffset, newY, xOffset - 5, newY);
	}

	for (i = 1; i <= yTicks; i++){
		var newY = (yOffset - (i * yTickSpacing));
		var newX = xOffset - 10;
		var seriesData = data.series.data[i - 1];

		drawText(canvas, seriesData.text, newX, newY, 10, 'right');

		for (var j = 0; j < xTicks; j++){
			var dataValue = seriesData.values[j];

			drawCircle(canvas, xOffset + ((j+1) * xTickSpacing), newY, 4, (dataValue ? "#FF0000" : "#009700"));
		}
	}

	rotate(canvas, Math.PI/2);
	for (i = 1; i <= xTicks; i++){
		var seriesData = data.series.x[i - 1];
		//text(data.series.x[i - 1], (yOffset + 10), (-1 * ((i * xTickSpacing) + xOffset)));

		drawText(canvas, seriesData, (yOffset + 10), (-1 * ((i * xTickSpacing) + xOffset)), 10);
	}
	rotate(canvas, 0);
}
