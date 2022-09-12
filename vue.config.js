const path = require('path');
const Obfuscator = require('webpack-obfuscator');
module.exports = {
    publicPath: './',
    lintOnSave: false,
    devServer: {
        proxy: 'http://127.0.0.1:3000'
    },
    productionSourceMap: false,
    chainWebpack(config) {

        console.log(process.env.NODE_ENV);

        config.when(process.env.NODE_ENV === 'production', (config) => {
            config.externals({
                'joi': 'joi',
                'jquery': 'jQuery',
                'vue': 'Vue',
                'vue-router': 'VueRouter'
            });

            config.plugin('obfuscator').use(Obfuscator, [{
                compact: true,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayThreshold: 1,
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            }]);

            config.entry('app').clear().add(path.join(__dirname, "./src/main-prod.js"));
            config.plugin('html').tap(args => {
                args[0].isProduction = true;
                return args;
            });
            console.log(config.toConfig());
        }, (config) => {

        });

    }
}