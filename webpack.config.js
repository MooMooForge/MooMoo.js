const path = require('path');


const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: false,
                    mangle: false,
                    parse: false,
                    output: false,
                    format: {
                        beautify: true,
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
