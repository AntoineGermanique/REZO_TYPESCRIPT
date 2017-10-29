const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssEntryPlugin = require("css-entry-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// require('css-loader!./css/styles.css');
module.exports = {
  entry:
  {
    "main": __dirname + '/ts/rezo.ts',
  },


  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },

      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin("[name].css")
  ]
}