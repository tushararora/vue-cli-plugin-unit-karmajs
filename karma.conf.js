const merge = require( 'webpack-merge' );

let sourcemapPluginExists = false;
try {
  require( 'karma-sourcemap-loader' );
  sourcemapPluginExists = true;
} catch (ex) {

}

module.exports = ( { webpackConfig, karmaOptions, watch, browsers } ) => {
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

  const karmaConfig = Object.assign( {}, karmaOptions );

  Object.assign( karmaConfig, {
      autoWatch: watch,

      singleRun: !watch,

      preprocessors,

      webpack: webpackConfig
    }
  );

  if ( browsers ) {
    if ( (typeof browsers === 'string') || (browsers instanceof String) ) {
      browsers = browsers.split( ',' );
    }
    karmaConfig.browsers = browsers
  }

  return karmaConfig;
};
