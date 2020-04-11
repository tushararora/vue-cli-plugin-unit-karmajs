const karmaConstants = require( 'karma' ).constants;

/**
 * Default config for karma
 */
module.exports = {
  files: [
    'tests/unit/**/*.spec.js'
  ],

  reporters: [ 'mocha' ],

  browsers: [ 'Chrome', 'Firefox' ],

  frameworks: [ 'mocha', 'chai' ],

  logLevel: karmaConstants.LOG_ERROR,

  webpackMiddleware: {
    stats: 'minimal'
  }
};