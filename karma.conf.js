/* global module */
module.exports = function (config) {
  'use strict';

  var configuration = {
    autoWatch: true,
    singleRun: true,
    frameworks: ['jspm', 'mocha', 'sinon-chai'],
    jspm: {
      stripExtension: false,
      loadFiles: ['jspm_packages/github/webcomponents/webcomponentsjs@0.7.22/webcomponents-lite.js', 'test/**/test.spec.js'],
      serveFiles: ['./html.js', 'test/**/*.js', 'test/**/*.html', 'test/**/*.css', 'jspm_packages/**/*.js']
    },
    proxies: {
      '/html.js': '/base/html.js',
      '/test': '/base/test',
      '/jspm_packages': '/base/jspm_packages'
    },
    browsers: ['Chrome', 'Firefox', 'Safari'],  // web compoenents don't work in PhantomJS
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    reporters: ['mocha']
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Firefox', 'Chrome_travis_ci'];
  }

  config.set(configuration);
};
