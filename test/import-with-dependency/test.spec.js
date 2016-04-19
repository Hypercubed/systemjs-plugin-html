var chai = require('chai');
var expect = chai.expect;

describe('HTML import Polymer web component with dependency', function () {
  var doc = null;

  before(function () {
    var d = document.createElement('div');
    d.style.visibility = 'hidden';
    d.innerHTML = '<dom-element-dep id="dom-element-dep-instance"></dom-element-dep>';
    document.body.appendChild(d);

    return System.import('test/import-with-dependency/dom-element.html!').then(function (data) {
      doc = data;
    });
  });

  it('returns an HTMLDocument', function () {
    expect(doc).to.be.an.instanceof(HTMLDocument);
  });

  it('contains the dom-element-dep template', function () {
    var template = doc.getElementById('dom-element-dep');
    expect(template).to.be.an.instanceof(HTMLElement);
  });

  it('creates the polymer element', function () {
    var element = window.document.getElementById('dom-element-dep-instance');
    expect(element.greeting).to.equal('*I\'m a DOM element. This is my local DOM!*');
  });

  it('executes the polymer ready event', function () {
    var element = window.document.getElementById('dom-element-dep-instance');
    expect(element.$.content.innerHTML).to.equal('<p><em>I\'m a DOM element. This is my local DOM!</em></p>\n');
  });
});
