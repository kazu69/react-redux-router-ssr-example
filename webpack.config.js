const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const banner = `
     React + Redux + React Router with SSR Example
`
module.exports = {
    context: __dirname + '/src',
    entry: {
        js: [__dirname + "/src/main.jsx"],
        css: [__dirname + "/src/main.css"],
    },
    output: {
        path: __dirname + "/public",
        filename: "bundle.[name]",
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: ["/node_modules/"],
                loader: "babel-loader",
                query:{
                    presets: [
                        "flow",
                        "latest",
                    ],
                    plugins: [
                         "transform-react-jsx",
                    ]
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    loader: 'css-loader?importLoaders=1!postcss-loader',
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
            options: {
                context: __dirname,
            }
        }),
        new ExtractTextPlugin('bundle.css'),
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true,
            test: /\.js/
        }),
    ],
    devServer: {
        contentBase: __dirname + "/public",
        port: 8000,
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    }
}
