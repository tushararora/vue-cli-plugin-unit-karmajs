const karmaConstants = require( 'karma' ).constants;
const merge = require( 'webpack-merge' );

let sourcemapPluginExists = false;
try {
  require( 'karma-sourcemap-loader' );
  sourcemapPluginExists = true;
} catch (ex) {

}

module.exports = ( { webpackConfig, karmaOptions, watch } ) => {
  delete webpackConfig.entry;
  webpackConfig = merge( webpackConfig, {
    devtool: 'inline-source-map'
  } );

  const enabledPreprocessors = [ 'webpack' ];
  if ( sourcemapPluginExists ) {
    enabledPreprocessors.push( 'sourcemap' );
  }

  const preprocessors = {};

  karmaOptions.files.map( fileNameOrPattern => {
    preprocessors[ fileNameOrPattern ] = enabledPreprocessors;
  } );

  let karmaConfig = {
    files: karmaOptions.files,

    reporters: karmaOptions.reporters,

    logLevel: karmaConstants.LOG_ERROR,

    autoWatch: watch,

    singleRun: !watch,

    browsers: karmaOptions.browsers,

    frameworks: karmaOptions.frameworks,

    preprocessors,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'minimal'
    }
  };

  return karmaConfig;
};
