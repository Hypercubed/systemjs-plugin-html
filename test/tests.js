var mocha = require('mocha');
mocha.setup('bdd');

describe('HTML imports', function () {
  require('./import/test.spec');
  require('./import-nested-elements/test.spec');
  require('./import-with-dependency/test.spec');
});

describe('JS imports', function () {
  require('./import-js/test.spec');
  require('./import-two-elements/test.spec');
});

mocha.run();
