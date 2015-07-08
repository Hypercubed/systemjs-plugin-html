/*
  HTML Import plugin
*/
var waitSeconds = 100;

var head = document.getElementsByTagName('head')[0];

var noop = function() {};

function importHref(url) {

  return new Promise(function(resolve, reject) {

    var timeout = setTimeout(function() {
      reject('Unable to load HTML');
    }, waitSeconds * 1000);
    var _callback = function(error) {
      clearTimeout(timeout);
      link.onload = link.onerror = noop;
      setTimeout(function() {
        if (error)
          reject(error);
        else
          resolve('');
      }, 7);
    };

    var link = document.createElement('link');
    link.rel = 'import';
    link.href = url;

    link.onload = function() {
      _callback();
    };

    link.onerror = function(event) {
      _callback(event.error);
    };

    head.appendChild(link);
  });

}

exports.fetch = function(load) {
  return importHref(load.address);
};
