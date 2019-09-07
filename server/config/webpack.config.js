const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../bin'),
        filename: 'server.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js(\?.*)?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};