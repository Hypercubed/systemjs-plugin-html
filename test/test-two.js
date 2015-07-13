import chai from 'chai';
const expect = chai.expect;

describe('JS import with HTML import dependency', function() {

  var main = null;

  beforeEach(function() {
    return System.import('../import-two-elements-example/main').then(function(m) {
      main = m;
    });
  });

  it('exports polymer constructors', function () {
    expect(main.domElementOne.prototype.is).to.equal('dom-element-one');
    expect(main.domElementTwo.prototype.is).to.equal('dom-element-two');
  });

});
