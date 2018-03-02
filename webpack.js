const path = require('path');
const webpack = require('webpack');
const root = path.resolve(__dirname,'src');
const DefinePlugin = webpack.DefinePlugin;
const ContextReplacementPlugin = webpack.ContextReplacementPlugin;

module.exports = {

    output: {
        path: path.resolve(__dirname,'release'),
        filename: 'index.js',
        publicPath: '/'
    },
    entry: {
        main: path.resolve(__dirname,'index.ts')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname,"node_modules"),root]
    },
    plugins: [
        new ContextReplacementPlugin(
            /ng-metadata/,
            root
        )
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
    },
    plugins: [
    ]
}