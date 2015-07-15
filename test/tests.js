var mocha = require('mocha');
mocha.setup('bdd');

require('./import/test.spec');
require('./import-with-dependency/test.spec');
require('./import-two-elements/test.spec');

mocha.run();
