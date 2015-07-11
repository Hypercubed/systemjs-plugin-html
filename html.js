/*
  HTML Import plugin
*/

if (typeof window !== 'undefined') {
  var waitSeconds = 100;

  var head = document.getElementsByTagName('head')[0];

  var noop = function() {};

  exports.fetch = function(load) {
    return importHref(load.address);
  };

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

} else {
  exports.fetch = function(load) {
    load.metadata.build = true;
    load.metadata.format = 'defined';
    return '';
  };
  exports.instantiate = function() {};
  exports.bundle = function(loads, opts) {
    var loader = this;
    return loader['import']('./html-builder', { name: module.id }).then(function(builder) {
      return builder.call(loader, loads, opts);
    }, function() {
      throw new Error('ERROR!');
    });
  };
}
