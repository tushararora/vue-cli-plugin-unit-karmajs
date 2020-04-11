const merge = require( 'webpack-merge' );

module.exports = ( { webpackConfig, karmaOptions, watch } ) => {
  delete webpackConfig.entry;
  webpackConfig = merge( webpackConfig, {
    devtool: 'inline-source-map'
  } );

  const preprocessors = {};

  karmaOptions.files.map( fileNameOrPattern => {
    preprocessors[ fileNameOrPattern ] = [ 'webpack' ];
  } );

  const karmaConfig = Object.assign( {}, karmaOptions );

  Object.assign( karmaConfig, {
      autoWatch: watch,

      singleRun: !watch,

      preprocessors,

      webpack: webpackConfig
    }
  );

  return karmaConfig;
};
