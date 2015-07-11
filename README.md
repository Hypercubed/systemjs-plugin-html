# SystemJS Plugin for HTML Imports

### Usage

```javascript
import './dom-element-one.html!';
import './dom-element-two.html!';
```

###Build for Production
```bash
jspm bundle-sfx main
```

The build creates 2 files `build.js` and `elements.html`  
```html
<link rel="import" href="elements.html">
```
```html
<script src="build.js"></script>
```
