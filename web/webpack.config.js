let Encore = require('@symfony/webpack-encore');

const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    // the project directory where all compiled assets will be stored
    .setOutputPath('public/build/')
    .enableSingleRuntimeChunk()

    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')

    .addEntry('layout', './assets/js/layout.js')
    .addEntry('rep_log', './assets/js/rep_log.js')
    .addEntry('rep_log_react', './assets/js/rep_log_react.js')
    .addEntry('login', './assets/js/login.js')

    .enableBuildNotifications()
    // fixes modules that expect jQuery to be global
    .autoProvidejQuery()

    .addPlugin(new CopyWebpackPlugin([
        // copies to {output}/static
        {from: './assets/static', to: 'static'}
    ]))


    .configureBabel((babelConfig) => {
        if (Encore.isProduction()) {
            babelConfig.plugins.push(
                'transform-react-remove-prop-types'
            );
        }
        babelConfig.plugins.push('@babel/plugin-proposal-class-properties');
    })

    // enables @babel/preset-env polyfills
    // .configureBabelPresetEnv((config) => {
    //     config.useBuiltIns = 'usage';
    //     config.corejs = 3;
    // })
    .enableReactPreset()

    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .cleanupOutputBeforeBuild()
    .enableVersioning(Encore.isProduction())
    .configureDevServerOptions(options => {
        options.server = {
            type:    'https',
            options: {
                key:  '/var/www/certs/replog.local.key',
                cert: '/var/www/certs/replog.local.crt',
            }
        }
        options.allowedHosts = 'all';
        options.client= {
            webSocketURL: 'wss://replog.local:8112/ws'
        }
    })
;

// export the final configuration
let config = Encore.getWebpackConfig();

console.log(config.devServer);

module.exports = config;
