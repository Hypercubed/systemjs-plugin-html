// Credits:
// Guy Bedford https://github.com/guybedford

/* eslint import/no-extraneous-dependencies: 0 */

var Vulcan = require('@node/vulcanize');
var Promise = global.Promise || require('@node/es6-promise').Promise;
var mkdirp = require('@node/mkdirp');
var dirname = require('@node/path').dirname;

var fs = require('@node/fs');

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
    if (Object.prototype.hasOwnProperty.call(b, p)) {
      a[p] = b[p];
    }
  }
  return a;
}

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

  // var rootURL = loader.rootURL || fromFileURL(loader.baseURL);
  var outFile = opts.outFile.replace(/\.js$/, '.html');

  var output = loads.map(function (load) {
    return '<link rel="import" href="' + fromFileURL(load.address) + '">';
  }).join('\n');

  return new Promise(function (resolve, reject) {
    mkdirp.sync(dirname(opts.outFile));
    fs.writeFileSync(outFile, output);
    console.log('     Vulcanizing ', outFile);

    vulcan.process(outFile, function (error, output) {
      if (error) {
        return reject(error);
      }
      fs.writeFileSync(outFile, output);
      resolve('');
    });
  });
};
