let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [
            '.js', '.json', '.webpack.js', '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx$/, use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'stage-3']
                    }
                }]
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {test: /\.sass/, use: ['style-loader', 'css-loader', 'sass-loader']},
        ]
    },
    plugins: [
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + '/src', 'index.html')
        }),
        new UglifyjsWebpackPlugin({
            sourceMap: true,
            uglifyOptions: {
                ecma: 8
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new CleanWebpackPlugin(['build']),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/assets/',
                to: __dirname + '/build/assets'
            }
        ])
    ],
};