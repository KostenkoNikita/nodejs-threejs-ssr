const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./client/src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: './client/src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [htmlPlugin, new MiniCssExtractPlugin()],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: "[name].js"
    },
    devServer: {
        contentBase: './dist'
    }
};