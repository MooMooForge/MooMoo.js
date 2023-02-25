const path = require('path');


const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new TerserWebpackPlugin({
                terserOptions: {
                    compress: false,
                    mangle: {
                        keep_classnames: true,
                        keep_fnames: true
                    },
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
            {
                test: /\.coffee$/,
                loader: "coffee-loader",
              },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};
