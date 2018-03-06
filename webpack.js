const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname,'src');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const NoEmitOnErrorsPlugin = webpack.NoEmitOnErrorsPlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname,'release','bundles'),
        filename: 'store.umd.js',
        library:'ngrx.store',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    entry: [
        "babel-polyfill",
        path.resolve(__dirname,'index.ts')
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname,"node_modules"),root]
    },
    externals: [
        'deep-freeze-strict',
        '@ngrx/store'
    ],
    plugins: [
        new NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({ sourceMap: true }),
        new DefinePlugin({
            'ENV': { NODE_ENV: "'production'"}
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                exclude: [
                    /node_modules/
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env'
                            ]
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
           
        ]
    },
    node: {
        watch: false,
        global: true,
        process: true,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}