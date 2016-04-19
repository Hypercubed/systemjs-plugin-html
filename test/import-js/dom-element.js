import polymer from 'polymerjs';
import './dom-element.html!';

var PolymerElement = polymer({
  is: 'dom-element-js',
  properties: {
    greeting: {
      type: String,
      value: 'I\'m a DOM element. This is my local DOM!'
    }
  },
  created: function () {
    this.createdRan = true;
  }
});

export default PolymerElement;
