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
        minimize: true,
        minimizer: [new TerserWebpackPlugin({
            terserOptions: {
                keep_classnames: true,
                keep_fnames: true,
                compress: {
                    reduce_funcs: true,
                    passes: 20,
                    reduce_vars: true
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
