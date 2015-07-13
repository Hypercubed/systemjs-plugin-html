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

The bundling is not implemented at the moment.

## License

MIT
