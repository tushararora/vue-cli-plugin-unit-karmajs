const webpackConfig = require( '@vue/cli-service/webpack.config' );
const karmaOptions = require( 'vue-cli-plugin-unit-karmajs/default-karma-config' );
const path = require( 'path' );
const karmaConfBuilder = require( 'vue-cli-plugin-unit-karmajs/karma.conf' );

const customConfigPath = path.resolve( 'vue.config' );
const currentProjectFolder = path.resolve( '.' );
const customConfig = require( customConfigPath );
if ( customConfig.pluginOptions && customConfig.pluginOptions.karma ) {
    Object.assign( karmaOptions, customConfig.pluginOptions.karma );
}

module.exports = function ( config ) {
    const newConfig = karmaConfBuilder( { webpackConfig, karmaOptions, watch: false } );
    newConfig.basePath = currentProjectFolder;
    config.set( newConfig );
};
