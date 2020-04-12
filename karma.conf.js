const karmaConstants = require( 'karma' ).constants;
const merge = require( 'webpack-merge' );

module.exports = ( { webpackConfig, karmaOptions, watch, browsers } ) => {
  delete webpackConfig.entry;
  webpackConfig = merge( webpackConfig, {
    devtool: 'inline-source-map'
  } );

  const preprocessors = {};

  karmaOptions.files.map( fileNameOrPattern => {
    preprocessors[ fileNameOrPattern ] = [ 'webpack' ];
  } );

  if ( browsers ) {
    if ( (typeof browsers === 'string') || (browsers instanceof String) ) {
      browsers = browsers.split( ',' );
    }
  } else {
    browsers = karmaOptions.browsers;
  }

  let karmaConfig = {
    files: karmaOptions.files,

    reporters: karmaOptions.reporters,

    logLevel: karmaConstants.LOG_ERROR,

    autoWatch: watch,

    singleRun: !watch,

    browsers: browsers,

    frameworks: karmaOptions.frameworks,

    preprocessors,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'minimal'
    }
  };

  return karmaConfig;
};
