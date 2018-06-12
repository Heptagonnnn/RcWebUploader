let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: __dirname + '/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'eval-source-map',
    resolve: {
        extensions: [
            '.js', '.json', '.webpack.js', '.jsx'
        ]
    },
    module: {
        rules: [
            {test: /\.js$/, use: [{
                    loader: 'babel-loader',
                    options:{
                        presets: ['react', 'stage-3']
                    }
                }]},
            {test: /\.jsx$/, use: [{
                loader: 'babel-loader',
                options:{
                    presets: ['react', 'stage-3']
                }
            }]},
            {test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader']},
            {test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader']},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + '/', 'index.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        require('autoprefixer')
    ],
    devServer: {
        contentBase: '/',
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};