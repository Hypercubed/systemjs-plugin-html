/* global module */
module.exports = function (config) {
  'use strict';
  config.set({
    autoWatch: true,
    singleRun: true,
    frameworks: ['jspm', 'mocha','sinon-chai'],
    jspm: {
			packages: 'jspm_packages/',
      config: 'config.js',
      loadFiles: ['test/**/test.spec.js'],
      serveFiles: ['html.js','test/**/*.js','test/**/*.html','test/**/*.css']
    },
    proxies: {
      '/test': '/base/test'
    },
    browsers: ['Chrome','IE','Firefox'],  // web compoenents don't work in PahntomJS
    reporters: ['mocha'],
  });
};
