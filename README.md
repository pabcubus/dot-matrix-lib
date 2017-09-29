# Dot-Matrix Library v1.1.3

**dot-matrix-lib** is an open-source JavaScript library for rendering Dot Matrix Charts using the HTML5 Canvas library.

# Installation

Download dot-matrix-lib using bower.

```
bower install dot-matrix-lib --save
```

To use this library simply add it to the HTML:

``` html
<link rel="stylesheet" href="/dist/css/dot-matrix-lib.min.css">
<script src="/dist/js/dot-matrix-lib.min.js"></script>
```

# Usage

To use this library, you must create a container or DIV element with the desired ID, then the library will create a canvas inside that container. You must create it like this:

```html
<div id="dot-matrix-wrapper"></div>
```

Setting chart parameters
```javascript

var data = {
	size: {				// optional
		height: 'auto',	// 'auto' to auto adjust or a number to set the height
		width: 'auto'	// 'auto' to auto adjust or a number to set the width
	},
	dot_popup: false,	// This param is when you don't want the popup to show on each point.
	series: {
		categories: [	// The framework just accepts 2 types for now
			'Active',
			'Not Active'
		],
		x: [],			// here you put the X axis ticks
		data: [			// Here you'll put the Y ticks as an object having "text" and "values" as properties. Also the values should be the same length as the X ticks. For the values it'll only accept booleans, so for example: values: [true,true,true,false,false].
			{
				text: "Item 1",
				values: []
			}
		],
		labels: {		// The title labels for each of the axis are optional
			x: 'Time',
			y: 'Mac Addresses'
		}
	}
}

```

Calling the method to draw the graph
```javascript

drawGraph(id, data, customWidth, customHeight);
// id: The id of the parent wrapper
// data: The data for the graph
// customWidth: The custom width. If there's none, then it will take the parent's width
// customHeight: The custom height. If there's none, then it will take the parent's height

drawGraph('dot-matrix-wrapper', data);

```

This library can be used also using **RequireJS**, like this:
```javascript
require.config({
	paths: {
		'dotMatrix':				'../bower_components/dot-matrix-lib/dist/dot-matrix-lib'
	},

	shim: {
		'dotMatrix':				{ exports: 'dotMatrix' }
	},

	waitSeconds: 15,

	deps: [
		// kick start application... see bootstrap.js
		'setup/appStarter'
	]
});
```

# Example

In this repo there's an 'example' folder which you can go and watch an example of this library. Get to the folder then run:
```sh
$ npm install
$ npm start
```
Then in your browser go to `http://localhost:5000/`.

# Author

Pablo Bassil
pabcubus@gmail.com
