// Credits:
// Guy Bedford https://github.com/guybedford

var Vulcan = System._nodeRequire('vulcanize');
var Promise = global.Promise || System._nodeRequire('es6-promise').Promise;

// it's bad to do this in general, as code is now heavily environment specific
var fs = System._nodeRequire('fs');

var isWin = process.platform.match(/^win/);

function fromFileURL(address) {
  address = address.replace(/^file:(\/+)?/i, '');

  if (isWin) {
    address = address.replace(/\//g, '\\');
  } else {
    address = '/' + address;
  }

  return address;
}

function extend(a, b) {
  for (var p in b) {
    if (b.hasOwnProperty(p)) {
      a[p] = b[p];
    }
  }
  return a;
}

/* function errCallback(err) {
  setTimeout(function () {
    throw err;
  });
} */

module.exports = function bundle(loads, opts) {
  var loader = this;

  var options = {
    excludes: [],
    inlineScripts: true,
    inlineCss: true,
    implicitStrip: true,
    stripComments: false
  };

  if (loader.vulvanizeHTML) {
    extend(options, loader.vulvanizeHTML);
  }

  var vulcan = new Vulcan(options);

  /* var minimize = new Minimize({
    empty: false, // KEEP empty attributes
    cdata: true, // KEEP CDATA from scripts
    comments: false, // KEEP comments
    ssi: false, // KEEP Server Side Includes
    conditionals: true, // KEEP conditional internet explorer comments
    spare: false, // KEEP redundant attributes
    quotes: false, // KEEP arbitrary quotes
    loose: false // KEEP one whitespace
  }); */

  // var rootURL = loader.rootURL || fromFileURL(loader.baseURL);
  var outFile = opts.outFile.replace(/\.js$/, '.html');

  var output = loads.map(function (load) {
    return '<link rel="import" href="' + fromFileURL(load.address) + '">';
  }).join('\n');

  var stubDefines = loads.map(function (load) {
    return "System\.register('" + load.name + "', [], false, function() {});";
  }).join('\n');

  return new Promise(function (resolve, reject) {
    fs.writeFileSync(outFile, output);
    console.log('     Vulcanizing ', outFile);

    vulcan.process(outFile, function (error, output) {
      if (error) {
        return reject(error);
      }
      // minimize.parse(output, function(error, output) {
        // if (error) { return reject(error); }
      fs.writeFileSync(outFile, output);
      resolve(stubDefines);
      // });
    });
  });
};
