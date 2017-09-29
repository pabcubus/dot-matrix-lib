/**
 * @license Dot-Matrix-Lib v1.1.3
 * Author: Pablo Bassil
 */
var canvasId = 'dot-matrix-canvas';

var yTicks;
var yTickSpacing;

var xTicks;
var xTickSpacing;

var points = [];
var radius = 4;

var thisFontSize = 11;

var tempCanvas;

function init(id){
	var popup;
	var title;
	var div1;
	var div2;

	tempCanvas = document.createElement('canvas');
	tempCanvas.setAttribute('style', 'display: none;');

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
	wrapper.setAttribute('style', 'position: relative;');
	wrapper.appendChild(popup);
}

function mouseMoveEvent(event) {
	var x			= event.offsetX;
	var y			= event.offsetY;
	var popup		= document.getElementsByClassName('dot-popup')[0];
	var xValue		= document.getElementById('xValue');
	var yValue		= document.getElementById('yValue');
	var canToggle	= true;

	points.forEach(function(item){
		if (canToggle) {
			if (item.x <= (x - (radius/2)) && (x - (radius/2)) <= (item.x + (radius * 2)) &&
				item.y <= (y - (radius/2)) && (y - (radius/2)) <= (item.y + (radius * 2))) {

				popup.setAttribute('style', 'display: block; top: ' + (event.offsetY + 10) + 'px; left:' + (event.offsetX + 10) + 'px;');
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

function getStringsWidth(arrayStrings, fontSize){
	var maxWidth	= 0;
	var ctx			= tempCanvas.getContext("2d");
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

function drawCircle(canvas, x, y, r, colorString) {
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
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

function push(canvas) {
	var ctx = canvas.getContext("2d");
	ctx.save();
}

function pop(canvas) {
	var ctx = canvas.getContext("2d");
	ctx.restore();
}

function drawGraph(id, data){
	init(id);

	points = [];

	var legendHeight	= 25;

	var customWidth;
	var customHeight;

	// We get the wrapper
	var wrapper = document.getElementById(id);

	var style			= getComputedStyle(wrapper);
	var paddingVert		= parseInt(style.paddingTop.replace('px',''))	+ parseInt(style.paddingBottom.replace('px',''));
	var paddingHorz		= parseInt(style.paddingLeft.replace('px',''))	+ parseInt(style.paddingRight.replace('px',''));

	var canvas	= document.getElementById(canvasId);
	if (canvas) {
		wrapper.removeChild(canvas);
	}

	// We get the maximum Axis labels size
	var yLabels = [];
	data.series.data.forEach(function(item, index){
		yLabels.push(item.text);
	})

	var xLabels = [];
	data.series.x.forEach(function(item, index){
		xLabels.push(item);
	})
	var maxXLabelSize	= getStringsWidth(xLabels, thisFontSize);
	var maxYLabelSize	= getStringsWidth(yLabels, thisFontSize);

	var xOffset			= maxYLabelSize + 40;
	var yOffset			= maxXLabelSize + 40;

	// We set the number of ticks for each of the axis
	yTicks				= data.series.data.length;
	xTicks				= data.series.x.length;

	// We get the height and width which we want to work with. We check for the size property on the data object
	if ((typeof data.size !== 'undefined') && (typeof data.size.height == 'string') && (data.size.height == 'auto')){
		let tickSpacing		= thisFontSize + 10;
		customHeight 	= legendHeight + maxXLabelSize + (tickSpacing * (yTicks + 1));
		yTickSpacing	= (customHeight - yOffset - legendHeight) / (yTicks + 1);
	} else if ((typeof data.size !== 'undefined') && (typeof data.size.height == 'number')){
		customHeight 	= data.size.height;
		yTickSpacing	= (customHeight - legendHeight - yOffset) / (yTicks + 1);
	} else {
		customHeight 	= wrapper.clientHeight - paddingHorz;
		yTickSpacing	= (customHeight - legendHeight - yOffset) / (yTicks + 1);
	}

	if ((typeof data.size !== 'undefined') && (typeof data.size.width == 'string') && (data.size.width == 'auto')){
		let tickSpacing		= thisFontSize + 10;
		customWidth 	= maxYLabelSize + (tickSpacing * (xTicks + 1));
		xTickSpacing	= (customWidth - xOffset) / (xTicks + 1);
	} else if ((typeof data.size !== 'undefined') && (typeof data.size.width == 'number')){
		customWidth 	= data.size.width;
		xTickSpacing	= (customWidth - xOffset) / (xTicks + 1);
	} else {
		customWidth 	= wrapper.clientWidth - paddingVert;
		xTickSpacing	= (customWidth - xOffset) / (xTicks + 1);
	}

	var xOrigin			= xOffset;
	var yOrigin			= (customHeight - yOffset);

	// We create the new canvas and the append it inside the wrapper
	var newCanvas = document.createElement('canvas');
	newCanvas.setAttribute('width', customWidth);
	newCanvas.setAttribute('height', customHeight);
	if (data.dot_popup == true || data.dot_popup == undefined || data.dot_popup == null){
		newCanvas.addEventListener('mousemove', mouseMoveEvent);
	}
	newCanvas.setAttribute('id', canvasId);
	wrapper.appendChild(newCanvas);

	// We select the previously created Canvas
	canvas	= document.getElementById(canvasId);

	// We draw the legend on the top
	var legendXOffset	= customWidth * 0.3;
	var legendWidth		= getStringsWidth(data.series.categories, thisFontSize);
	drawCircle(canvas, legendXOffset, 13, 4, "#009700");
	drawText(canvas, data.series.categories[0], legendXOffset + 15, 17, thisFontSize);
	drawCircle(canvas, legendXOffset + legendWidth + 60, 13, 4, "#FF0000");
	drawText(canvas, data.series.categories[1], legendXOffset + legendWidth + 75, 17, thisFontSize);

	// We draw the axis
	// Y axis
	drawLine(canvas, xOffset, legendHeight, xOffset, yOrigin);
	// X axis
	drawLine(canvas, xOrigin, yOrigin, customWidth, yOrigin);

	// placing the X Axis ticks and labels
	for (let i = 1; i <= xTicks; i++){
		let newX = xOrigin + (i * xTickSpacing);
		drawLine(canvas, newX, yOrigin, newX, yOrigin + 5);

		push(canvas);
		rotate(canvas, Math.PI/2);
		newX = (newX - 3) * -1;
		let newY = yOrigin + 8;
		let seriesData = data.series.x[i - 1];
		drawText(canvas, seriesData, newY, newX, thisFontSize, 'left');
		pop(canvas);
	}

	// placing the Y Axis ticks and labels
	for (let i = 1; i <= yTicks; i++){
		let newY = yOrigin - (i * yTickSpacing);
		drawLine(canvas, xOffset, newY, xOffset - 5, newY);

		newY = newY + 3;
		let newX = xOffset - 8;
		let seriesData = data.series.data[i - 1];
		drawText(canvas, seriesData.text, newX, newY, thisFontSize, 'right');
	}

	// placing the dots
	for (let i = 1; i <= yTicks; i++){
		let y = yOrigin - (i * yTickSpacing);

		for (let j = 1; j <= xTicks; j++){
			let seriesData = data.series.data[i - 1];
			let dataValue = seriesData.values[j];
			let x = xOrigin + (j * xTickSpacing);

			drawCircle(canvas, x, y, radius, (dataValue ? "#009700" : "#FF0000"));

			points.push({
				'x': x - radius,
				'y': y - radius,
				'xTitle': seriesData.values[j] == true ? data.series.categories[0] : data.series.categories[1],
				'yTitle': seriesData.text
			});
		}
	}

	push(canvas);
	rotate(canvas, Math.PI*3/2);

	drawText(canvas, data.series.labels.y, (getStringsWidth([data.series.labels.y], thisFontSize) + 30) * -1, 15, thisFontSize, 'left');
	pop(canvas);

	if (typeof data.series.labels !== 'undefined' && typeof data.series.labels.x == 'string') {
		drawText(canvas, data.series.labels.x, (customWidth - (getStringsWidth([data.series.labels.x], thisFontSize) + 30)), (customHeight - 10), thisFontSize);
	} else {
		drawText(canvas, 'X Axis', (customWidth - (getStringsWidth(['X Axis'], thisFontSize) + 30)), (customHeight - 10), thisFontSize);
	}
}
