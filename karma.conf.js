/* global module */
module.exports = function (config) {
  'use strict';
  var configuration = {
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
    browsers: ['Chrome','IE','Firefox'],  // web compoenents don't work in PhantomJS
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['mocha'],
  };

  if(process.env.TRAVIS) {
    configuration.browsers = ['Firefox','Chrome_travis_ci'];
  }

  config.set(configuration);
};
