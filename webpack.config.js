const path = require('path');


const TerserWebpackPlugin = require('terser-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false,
        minimizer: [new TerserWebpackPlugin({
            terserOptions: {
                compress: {
                    hoist_funs: true,
                    reduce_funcs: true,
                    passes: 20,
                    drop_console: false,
                    drop_debugger: true,
                    ecma: 2015,
                    unsafe: true,
                    toplevel: true,
                    booleans_as_integers: true,
                    expression: true,
                    unsafe: false,
                },
                mangle: {
                    properties: {
                        reserved: ["packet", "data", "emit", "addEventListener", "on", "packet", "ws", "players", "teams", "Alliance", "Player"]
                    },
                },
                output: {
                    beautify: true,
                    comments: false,
                },
                ecma: 2020,
                toplevel: true,
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
