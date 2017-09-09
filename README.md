# Dot-Matrix Library

**dot-matrix-lib** is an open-source JavaScript library for rendering Dot Matrix Charts using the HTML5 Canvas library.

Check out an [Example](https://arpitnarechania.github.io/d3-dotmatrix/) where you can test various configuration options.

# Installation

Download dot-matrix-lib using bower.

```
bower install dot-matrix-lib --save
```

To use this library then, simply the library:

``` html
<script src="/path/to/lib/dot-matrix-lib.min.js"></script>
```

# Usage

To use this library, you must create a container or DIV element with the desired ID, then the library will create a canvas inside that container. You must create it like this:

```html
<div id="dot-matrix-wrapper"></div>
```

Setting chart parameters
```javascript

var data = {
	series: {
		categories: [ // The framework just accepts 2 types for now
			'Active',
			'Not Active'
		],
		x: [], // here you put the X axis ticks
		data: [ // Here you'll put the Y ticks as an object having "text" and "values" as properties. Also the values should be the same length as the X ticks
			{
				text: "Item 1",
				values: []
			}
		]
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

# Author

Pablo Bassil
pabcubus@gmail.com
