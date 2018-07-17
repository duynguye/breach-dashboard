const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: { minimize: true }
            }]
        }, {
            test: /\.(css|scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]--[hash:base64]',
                    sourceMap: true,
                    minimize: true
                }
            }, {
                loader: 'sass-loader'
            }, {
                loader: 'sass-resources-loader',
                options: {
                    resources: './src/shared/variables.scss'
                }
            }]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            include: path.join(__dirname, 'images'),
            loader: 'url-loader?limit=30000&name=images/[name].[ext]'
        }]
    },

    output: {
        publicPath: ASSET_PATH
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ]
}