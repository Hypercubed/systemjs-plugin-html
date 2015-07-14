/*
  HTML Import plugin
  Adapted from systemjs/plugin-css
  https://github.com/systemjs/plugin-css
*/

require('webcomponentsjs/webcomponents-lite');

exports.build = false;

exports.fetch = function(load) {
  return importHref(load);
};

exports.instantiate = function(load) {
  return load.metadata.link.import;
};

var waitSeconds = 100;
var head = (typeof document !== 'undefined') ? document.getElementsByTagName('head')[0] : null;

function errCallback(err) {
  setTimeout(function() { throw err; });
}

// from https://github.com/ModuleLoader/es6-module-loader/issues/95#issuecomment-98705035
function componentCallback(e, load) {
  var scripts = e.getElementsByTagName('script');
  var Q = [];
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (script.type == 'module') {
      var source = script.innerHTML.substr(1);
      var p = System.module(source, load)
        .catch(errCallback);
      Q.push(p);
    }
  }
  return Promise.all(Q);
}

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
      componentCallback(link.import, load).then(function() {
        _callback();
      });
    };

    link.onerror = function(event) {
      _callback(event.error);
    };

    document.getElementsByTagName('head')[0].appendChild(link);
  });
}
