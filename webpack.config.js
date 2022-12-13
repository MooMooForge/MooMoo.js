const path = require('path');


const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserWebpackPlugin({
            terserOptions: {
                compress: {
                    hoist_funs: true,
                    reduce_funcs: true,
                },
                output: {
                    beautify: true,
                    comments: false,
                },
                ecma: 2020,
            }
        })],
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
