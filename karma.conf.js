/* global module */
module.exports = function (config) {
  'use strict';
  config.set({
    autoWatch: true,
    singleRun: true,
    frameworks: ['jspm', 'mocha','sinon-chai','phantomjs-shim'],
    jspm: {
			packages: 'jspm_packages/',
      config: 'config.js',
      loadFiles: ['test/**/*.spec.js'],
      serveFiles: ['html.js','test/**/!(*spec).js','test/**/*.html','test/**/*.css']
    },
    proxies: {
        '/test': '/base/test'
    },
    browsers: ['Chrome'],
    reporters: ['mocha'],
  });
};
