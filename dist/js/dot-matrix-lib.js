/**
 * @license Dot-Matrix-Lib v1.1.1
 * Author: Pablo Bassil
 */
var canvasId = 'dot-matrix-canvas';

var yPoint;
var xPoint;

var yTicks;
var yTickSpacing;

var xTicks;
var xTickSpacing;

var points = [];
var radius = 4;



function init(id){
	var popup;
	var title;
	var div1;
	var div2;

	popup = document.createElement('div');
	popup.setAttribute('class', 'dot-popup');
	popup.setAttribute('style', 'display: none;');

	title = document.createElement('h4');
	title.innerHTML = 'Data';

	div1 = document.createElement('div');
	div1.setAttribute('id', 'xValue');

	div2 = document.createElement('div');
	div2.setAttribute('id', 'yValue');

	//popup.appendChild(title);
	popup.appendChild(div1);
	popup.appendChild(div2);

	var wrapper = document.getElementById(id);
	wrapper.appendChild(popup);
}

function mouseMoveEvent(event) {
	var x			= event.clientX;
	var y			= event.clientY;
	var popup		= document.getElementsByClassName('dot-popup')[0];
	var xValue		= document.getElementById('xValue');
	var yValue		= document.getElementById('yValue');
	var canToggle	= true;

	points.forEach(function(item){
		if (canToggle) {
			if (item.x <= (x - (radius/2)) && (x - (radius/2)) <= (item.x + (radius * 2)) &&
				item.y <= (y - (radius/2)) && (y - (radius/2)) <= (item.y + (radius * 2))) {

				popup.setAttribute('style', 'display: block; top: '+(y+10)+'px; left:'+(x+10)+'px;');
				xValue.innerHTML = item.xTitle;
				yValue.innerHTML = item.yTitle;

				canToggle = false;
			} else {
				popup.setAttribute('style', 'display: none;');
			}
		}
	});

	canToggle = true;
}

function getStringsWidth(canvas, arrayStrings, fontSize){
	var maxWidth	= 0;
	var ctx			= canvas.getContext("2d");
	ctx.font		= (typeof fontSize === 'number') ? fontSize + "px Arial" : "10px Arial";

	if (Array.isArray(arrayStrings)) {
		arrayStrings.forEach(function(str, index){
			var cWidth = ctx.measureText(str).width;
			if (cWidth > maxWidth) {
				maxWidth = cWidth;
			}
		});
	}

	return maxWidth;
}

function drawRect(canvas, x, y, width, height){
	var ctx	= canvas.getContext("2d");
	ctx.strokeRect(x, y, width, height);
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
	init(id);

	// We get the wrapper
	var wrapper = document.getElementById(id);

	var style			= getComputedStyle(wrapper);
	var paddingVert		= parseInt(style.paddingTop.replace('px',''))	+ parseInt(style.paddingBottom.replace('px',''));
	var paddingHorz		= parseInt(style.paddingLeft.replace('px',''))	+ parseInt(style.paddingRight.replace('px',''));

	// We get the height and width which we want to work with
	var customWidth		= Number.isInteger(customWidth) 	? customWidth 	: wrapper.clientWidth - paddingVert;
	var customHeight	= Number.isInteger(customHeight) 	? customHeight 	: wrapper.clientHeight - paddingHorz;

	var canvas	= document.getElementById(canvasId);
	if (canvas) {
		wrapper.removeChild(canvas);
	}

	// We create the new canvas and the append it inside the wrapper
	var newCanvas = document.createElement('canvas');
	newCanvas.setAttribute('width', customWidth);
	newCanvas.setAttribute('height', customHeight);
	newCanvas.addEventListener('mousemove', mouseMoveEvent);
	newCanvas.setAttribute('id', canvasId);
	wrapper.appendChild(newCanvas);

	// We select the previously created Canvas
	canvas	= document.getElementById(canvasId);

	var legendHeight = 25;
	var legendXOffset = customWidth * 0.3;
	var legendWidth = getStringsWidth(canvas, data.series.categories, 12);

	drawCircle(canvas, legendXOffset, 8, 4, "#009700", true);
	drawText(canvas, data.series.categories[0], legendXOffset + 15, 17, 12);
	drawCircle(canvas, legendXOffset + legendWidth + 60, 8, 4, "#FF0000", true);
	drawText(canvas, data.series.categories[1], legendXOffset + legendWidth + 75, 17, 12);

	var yLabels = [];
	data.series.data.forEach(function(item, index){
		yLabels.push(item.text);
	})

	yOffset = customHeight * 0.8;
	xOffset = 10 + getStringsWidth(canvas, yLabels, 12);

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

			drawCircle(canvas, xOffset + ((j+1) * xTickSpacing), newY, radius, (dataValue ? "#009700" : "#FF0000"));

			debugger;

			points.push({
				x: xOffset + ((j+1) * xTickSpacing),
				y: newY,
				xTitle: seriesData.values[j] == true ? data.series.categories[0] : data.series.categories[1],
				yTitle: seriesData.text
			});
		}
	}

	rotate(canvas, Math.PI/2);
	for (i = 1; i <= xTicks; i++){
		var seriesData = data.series.x[i - 1];

		drawText(canvas, seriesData, (yOffset + 10), (-1 * ((i * xTickSpacing) + xOffset)), 10);
	}
	rotate(canvas, 0);
}
