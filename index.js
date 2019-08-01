module.exports = ( api, projectOptions ) => {
  let karmaOptions = require( './default-karma-config' );

  if ( projectOptions.pluginOptions && projectOptions.pluginOptions.karma ) {
    karmaOptions = Object.assign( karmaOptions, projectOptions.pluginOptions.karma );
  }

  api.chainWebpack( webpackConfig => {
    if ( process.env.NODE_ENV === 'test' ) {
      webpackConfig.merge( {
        target: 'node',
        devtool: 'inline-cheap-module-source-map'
      } );

      // when target === 'node', vue-loader will attempt to generate
      // SSR-optimized code. We need to turn that off here.
      webpackConfig.module
        .rule( 'vue' )
        .use( 'vue-loader' )
        .tap( options => {
          options.optimizeSSR = false;
          return options;
        } );
    }
  } );

  api.registerCommand( 'test:unit', {
      description: 'Run unit tests with karma',
      usage: 'vue-cli-service test:unit [options] [...files]',
    }, ( args ) => {
      const webpackConfig = api.resolveWebpackConfig();

      process.env.VUE_CLI_BABEL_TARGET_NODE = true
      process.env.VUE_CLI_BABEL_TRANSPILE_MODULES = true

      return new Promise( ( resolve, reject ) => {
        let KarmaServer = require( 'karma' ).Server;
        let generateKarmaConfig = require( './karma.conf' );

        let karmaServer = new KarmaServer(
          generateKarmaConfig( {
            webpackConfig,
            karmaOptions,
            watch: args.watch || args.w
          } ), ( exitCode ) => {
            console.log( `Karma exited with exitCode ${exitCode}` );

            if ( exitCode === 0 ) {
              resolve( exitCode );
            } else {
              reject( exitCode );
            }
          }
        );

        karmaServer.start();
      } );
    }
  );
};
