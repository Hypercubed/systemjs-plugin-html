// Use Shadow DOM if available
window.Polymer = window.Polymer || {};
window.Polymer.dom = 'shadow';

// Add elements to be imported
import {prototype as domElementOne, document as domElementOneImport} from './dom-element-one';
import {prototype as domElementTwo, document as domElementTwoImport} from './dom-element-two';

export {domElementOne, domElementTwo, domElementOneImport, domElementTwoImport};
