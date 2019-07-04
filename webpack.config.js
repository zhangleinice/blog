const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './index.js',
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        // Hot Module Replacement
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')    
    },
    devServer: {
        port: 8080,
        open: true,
        contentBase: './dist/',
        compress: true,
        hot: true,
    },
    // tree shaking; product已经默认写好，则可以不用写了
    optimization: {
        usedExports: true
    }
}