// Use Shadow DOM if available
window.Polymer = window.Polymer || {};
window.Polymer.dom = 'shadow';

// Add elements to be imported
import domElementOne from './dom-element-one';
import domElementTwo from './dom-element-two';

export {domElementOne, domElementTwo};