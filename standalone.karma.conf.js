// If not set explicitly, set these envs to 'test', as vue-cli does by default for unit:test runners
process.env.BABEL_ENV = process.env.BABEL_ENV || 'test'
process.env.NODE_ENV = process.env.NODE_ENV || 'test'

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
