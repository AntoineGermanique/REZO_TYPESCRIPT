const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");

module.exports = merge(common, {
    entry: {
        "env": __dirname + '/environment/environment-web.ts',
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            "ENV": JSON.stringify('web')
        })
    ]
});