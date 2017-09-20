'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var postcssImport = require('postcss-import');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var HappyPack = require('happypack');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', 'webpack-hot-middleware/client?reload=true', './ui/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    new HtmlWebpackPlugin(),
    new HappyPack({
      // loaders is the only required parameter:
      loaders: [ 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0' ],
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'happypack/loader',
        exclude: /node_modules/,
        include: __dirname
      }, 
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.(css?|scss)$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // Font Definitions
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  postcss: function (webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      precss, 
      autoprefixer
    ];
  }
};


