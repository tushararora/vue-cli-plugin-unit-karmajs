const karmaConstants = require('karma').constants;
const merge = require('webpack-merge');

module.exports = ( { webpackConfig, karmaOptions, watch } ) => {
  delete webpackConfig.entry;
  webpackConfig = merge( webpackConfig, {
    devtool: 'inline-source-map'
  } );

  const preprocessors = {};

  karmaOptions.files.map( fileNameOrPattern => {
    preprocessors[ fileNameOrPattern ] = [ 'webpack' ];
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
