var mocha = require('mocha');
mocha.setup('bdd');

require('./test-one');
require('./test-two');

mocha.run();