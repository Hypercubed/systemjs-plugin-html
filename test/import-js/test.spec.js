
var chai = require('chai');
var expect = chai.expect;

describe('JS import Polymer web component', function () {
  var ctor = null;
  var elm = null;

  before(function () {
    var d = document.createElement('div');
    d.style.visibility = 'hidden';
    d.innerHTML = '<dom-element-js id="dom-element-js-instance"></dom-element-js>';
    document.body.appendChild(d);

    elm = document.getElementById('dom-element-js-instance');

    return System.import('test/import-js/dom-element').then(function (data) {
      ctor = data.default;
    });
  });

  it('returns an Element Contstructor', function () {
    expect(ctor).to.be.a('function');
  });

  /* it('contains the dom-element template', function () {
    var template = doc.getElementById('dom-element');
    expect(template).to.be.an.instanceof(HTMLElement);
  }); */

  it('creates the polymer element', function () {
    expect(elm.greeting).to.equal('I\'m a DOM element. This is my local DOM!');
  });

  it('executes the polymer created event', function () {
    expect(elm.createdRan).to.equal(true);
  });
});
