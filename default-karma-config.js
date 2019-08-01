    
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
};