var ticksCount = 75;

var data = {
	//dot_popup: false,
	series: {
		categories: [
			'Active',
			'Not Active'
		],
		x: [],
		data: [{
				text: "fd04:bd3:80e8:3:215:8d00:7e:14ca",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:baea",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:bda6",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:c984",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:eb30",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:cfe8",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:bafb",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:cfb3",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:baea",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:bda6",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:c984",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:eb30",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:cfe8",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:bafb",
				values: []
			},
			{
				text: "fd04:bd3:80e8:3:215:8d00:83:cfb3",
				values: []
			}
		]
	}
}

for (var k = 1; k <= ticksCount; k++) {
	data.series.x.push('Date ' + k);

	data.series.data.forEach(function(data, index){
		for (var l = 1; l <= ticksCount; l++) {
			data.values.push(getRandomNumber(5) > 0 ? true : false);
		}
	});
}

function getRandomNumber(number){
	return Math.floor(Math.random() * number);
}

setTimeout(
	function(){
		drawGraph('canvas-wrapper', data);
	}, 1000);
