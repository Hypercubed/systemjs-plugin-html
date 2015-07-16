systemjs-plugin-html
===========

HTML Import plugin

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

Bundling of html files is done using [Vulcanize](Polymer/vulcanize).  When bundling an `imports.html` will be created along side the `build.js` file.  You can disable html imports bundling by setting `System.buildHTML = false`.

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
