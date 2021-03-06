const path = require('path');

module.exports = {
    entry: './server/src/main.js',
    output: {
        path: path.resolve(__dirname, '../bin'),
        filename: 'server.js'
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js(\?.*)?$/,
                exclude: [
                    /(node_modules)/,
                    /(client)/
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    externals: {
        gl: "commonjs gl"
    }
};