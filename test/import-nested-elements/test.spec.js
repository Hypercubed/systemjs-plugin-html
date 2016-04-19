var chai = require('chai');
var expect = chai.expect;

describe('Nested HTML imports', function () {
  var doc = null;

  before(function () {
    var d = document.createElement('div');
    d.style.visibility = 'hidden';
    d.innerHTML = '<dom-element-one2 id="dom-element-one2-instance"></dom-element-one2>';
    d.innerHTML += '<dom-element-two2 id="dom-element-two2-instance"></dom-element-two2>';
    document.body.appendChild(d);

    return System.import('test/import-nested-elements/dom-element.html!').then(function (m) {
      doc = m;
    });
  });

  it('returns an HTMLDocument', function () {
    expect(doc).to.be.an.instanceof(HTMLDocument);
  });

  it('creates the polymer element', function () {
    var element = window.document.getElementById('dom-element-one2-instance');
    expect(element.greeting).to.equal('I\'m a nested DOM element. This is my local DOM!');
  });
});
