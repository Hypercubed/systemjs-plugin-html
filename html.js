/*
  HTML Import plugin
  Adapted from systemjs/plugin-css
  https://github.com/systemjs/plugin-css
*/

exports.build = false;

exports.fetch = function(load) {
  return importHref(load);
};

exports.instantiate = function(load) {
  return load.metadata.link.import;
};

var waitSeconds = 100;
var head = (typeof document !== 'undefined') ? document.getElementsByTagName('head')[0] : null;

function importHref(load) {

  return new Promise(function(resolve, reject) {

    var timeout = setTimeout(function() {
      reject('Unable to load HTML');
    }, waitSeconds * 1000);
    var _callback = function(error) {
      clearTimeout(timeout);
      link.onload = link.onerror = function() {};
      setTimeout(function() {
        if (error)
          reject(error);
        else
          resolve('');
      }, 7);
    };

    var link = load.metadata.link = document.createElement('link');
    link.rel = 'import';
    link.href = load.address;

    link.onload = function() {
      _callback();
    };

    link.onerror = function(event) {
      _callback(event.error);
    };

    document.getElementsByTagName('head')[0].appendChild(link);
  });
}
