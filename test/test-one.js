import chai from 'chai';
const expect = chai.expect;

describe('HTML import', function() {

  var doc = null;

  beforeEach(function() {
    return System.import('../import-example/dom-element.html!').then(function(data) {
      doc = data;
    });
  });

  it('returns an HTMLDocument', function () {
    expect(doc).to.be.an.instanceof(HTMLDocument);
  });

  it('contains the dom-element template', function () {
    var template = doc.getElementById('dom-element');
    expect(template).to.be.an.instanceof(HTMLElement);
  });

  it('creates the polymer element', function () {
    var element = window.document.getElementById('dom-element-instance');
    expect(element.greeting).to.equal('I\'m a DOM element. This is my local DOM!');
  });

  it('executes the polymer created event', function () {
    var element = window.document.getElementById('dom-element-instance');
    expect(element.createdRan).to.equal(true);
  });

});
