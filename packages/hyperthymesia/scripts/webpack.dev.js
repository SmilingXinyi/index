/**
 * Created by SmilingXinyi <smilingxinyi@gmail.com> on 2020/6/2
 */

const os = require('os');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConf = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');

// current IP
let IPv4;
for (let i = 0; i < os.networkInterfaces().en0.length; i++) {
    if (os.networkInterfaces().en0[i].family === 'IPv4') {
        IPv4 = os.networkInterfaces().en0[i].address;
    }
}
// port
const PORT = 8090;

module.exports = merge(
    commonConf, {
        entry: path.join(__dirname, '..', 'test'),
        mode: 'development',
        devServer: {
            contentBase: path.join(process.cwd(), "lib"),
            compress: true,
            host: '0.0.0.0',
            public: `${IPv4}:${PORT}`,
            port: PORT,
            hot: true,
            disableHostCheck: true
        },
        devtool: 'source-map',
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: false,
                template: HtmlWebpackTemplate,
                filename: 'index.html',
                meta: [
                    {
                        viewport: 'width=device-width, initial-scale=1, maximum-scale=1,'
                            + ' user-scalable=no, shrink-to-fit=no, viewport-fit=cover'
                    },
                    {
                        name: 'google',
                        value: 'notranslate'
                    }
                ],
                bodyHtmlSnippet: '<div id="root"></div>'
            })
        ]
    }
);
