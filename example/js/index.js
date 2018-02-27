var xTicksCount = 50;
var yTicksCount = 100;
var date		= new Date();

var data = {
	//dot_popup: false,
	size:{
		height: 'auto'
	},
	series: {
		categories: [
			'Active',
			'Not Active'
		],
		x: [],
		labels: {
			x: 'Time',
			y: 'Mac Addresses'
		},
		data: [
		]
	}
}

for (let i = 0; i < yTicksCount; i++) {
	let newobj = {
		text: 'fd0'+i+':bd'+i+':80e'+i+':3:215:8d0'+i+':7e:14c'+i+'',
		values: []
	};

	data.series.data.push(newobj);
}

for (let k = 1; k <= xTicksCount; k++) {
	data.series.x.push('Sample Date ' + k);

	data.series.data.forEach(function(data, index){
		for (var l = 1; l <= xTicksCount; l++) {
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
