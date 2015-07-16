// Credits:
// Guy Bedford https://github.com/guybedford

var Vulcan = System._nodeRequire('vulcanize');
var Promise = global.Promise || System._nodeRequire('es6-promise').Promise;
//var CleanCSS = require('clean-css');

// it's bad to do this in general, as code is now heavily environment specific
var fs = System._nodeRequire('fs');

var isWin = process.platform.match(/^win/);

function fromFileURL(address) {
  address = address.replace(/^file:(\/+)?/i, '');

  if (!isWin)
    address = '/' + address;
  else
    address = address.replace(/\//g, '\\');

  return address;
}

module.exports = function bundle(loads, opts) {
  var loader = this;

  var stubDefines = loads.map(function(load) {
    return "System\.register('" + load.name + "', [], false, function() {});";
  }).join('\n');

  var rootURL = loader.rootURL || fromFileURL(loader.baseURL);
  var tmpFile = opts.outFile.replace(/build\.js$/, 'elements.tmp');
  var outFile = opts.outFile.replace(/build\.js$/, 'elements.html');

  var vulcan = new Vulcan({
    excludes: [],
    inlineScripts: true,
    inlineCss: true,
    implicitStrip: true,
    stripComments: true
  });

  var output = loads.map(function(load) {
    return '<link rel="import" href="'+fromFileURL(load.address)+'">';
  }).join('\n');

  fs.writeFileSync(outFile, output);

  vulcan.process(outFile, function(error, data) {
    if (error) { return reject(error); }
    output = data;
    fs.writeFileSync(outFile, output);
  });

  return stubDefines;
};
