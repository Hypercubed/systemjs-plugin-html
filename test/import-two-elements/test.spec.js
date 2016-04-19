var chai = require('chai');
var expect = chai.expect;

describe('JS import with HTML import dependency', function () {
  var main = null;

  beforeEach(function () {
    return System.import('test/import-two-elements/main').then(function (m) {
      main = m;
    });
  });

  it('exports polymer constructors', function () {
    expect(main.domElementOne.prototype.is).to.equal('dom-element-one');
    expect(main.domElementTwo.prototype.is).to.equal('dom-element-two');
  });

  it('exports imported documents', function () {
    expect(main.domElementOneImport).to.be.an.instanceof(HTMLDocument);
    expect(main.domElementTwoImport).to.be.an.instanceof(HTMLDocument);
  });

});
