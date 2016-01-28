systemjs-plugin-html
===========

Bridging the gap between SystemJS (Universal dynamic module loader) and HTML imports.  Load HTML imports via SystemJS, include SystemJS modules (ES6, AMD, CommonJS) in HTML Imports, building using vulcanize via jspm and SystemJS builder.

***Watch out: This project is an experiment.  The HTML imports specification is still in flux and SystemJS is still new.***

[![Build Status](https://travis-ci.org/Hypercubed/systemjs-plugin-html.svg?branch=master)](https://travis-ci.org/Hypercubed/systemjs-plugin-html)

## Install

```
jspm install html=github:Hypercubed/systemjs-plugin-html
```

## Basic usage

```
import './dom-element.html!'
```

The html file is imported as an [HTML import](http://www.html5rocks.com/en/tutorials/webcomponents/imports/).  The [webcomponent.js polyfills](http://webcomponents.org/) may be required in browsers that lack native support.  The code above is equivalent to:

```
<link rel="import" href="./dom-element.html">
```

[See examples in the test folder](https://github.com/Hypercubed/systemjs-plugin-html/tree/master/test)

## Bundling

Bundling of html files is done using [Vulcanize](https://github.com/Polymer/vulcanize).  When bundling an `build.html` will be created along side the `build.js` file.  You can disable html imports bundling by setting `System.buildHTML = false`.

## Tests

Testing using karma:

```
karma start
```

or use [http-server](https://github.com/indexzero/http-server) and navigate to [http://localhost:8080/test/](http://localhost:8080/test/)

Tested with:

* JSPM v0.15.7
* SystemJS v0.16.11

Tested in:

* Chrome Version 43.0.2357.132 m
* IE 11.0.9600
* Firefox 39.0
* Firefox 41.0a2

## License

MIT
