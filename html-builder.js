// Credit:
// Guy Bedford https://github.com/guybedford

// it's bad to do this in general, as code is now heavily environment specific
var fs = System._nodeRequire('fs');

function escape(source) {
  return source
    .replace(/(["\\])/g, '\\$1')
    .replace(/[\f]/g, "\\f")
    .replace(/[\b]/g, "\\b")
    .replace(/[\n]/g, "\\n")
    .replace(/[\t]/g, "\\t")
    .replace(/[\r]/g, "\\r")
    .replace(/[\u2028]/g, "\\u2028")
    .replace(/[\u2029]/g, "\\u2029");
}

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

  var outFile = opts.outFile.replace(/build\.js$/, 'elements.html');

  var output = loads.map(function(load) {
    return fs.readFileSync(fromFileURL(load.address), {encoding: 'utf-8'});
  }).join('\n');

  var Minimize = require('minimize');
  var minimize = new Minimize({
    empty: false,         // KEEP empty attributes
    cdata: true,          // KEEP CDATA from scripts
    comments: false,      // KEEP comments
    ssi: true,            // KEEP Server Side Includes
    conditionals: true,   // KEEP conditional internet explorer comments
    spare: false,         // KEEP redundant attributes
    quotes: false,        // KEEP arbitrary quotes
    loose: false          // KEEP one whitespace
  });
  minimize.parse(output, function (error, data) {
    output = data;
    fs.writeFileSync(outFile, output);
  });

  return stubDefines;
};
