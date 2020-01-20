/*
  This file is intended for use as webpack configuration for a production server.
  Hot reloading is not required and we try to apply compression where possible.
  Note that we have an explicit build script but that is for generating stats only.
  The server will automatically compile code when it starts as well
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Have to export webpack settings object
module.exports = {

  // "name" is required if we want to compile multiple files
  name: "client",

  // Start point for the application
  entry: {
    index: [
      path.resolve(__dirname, '../../src/client/assets/js/main.js'),
    ]
  },

  // Enable production mode
  mode: 'production',

  /*
    Output parameters. Define the output directory, the URL relative path and
    target file name
  */
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/',
    filename: '[name]-bundle.js'
  },

  // Add all the loaders
  module: {
    rules: [{

      /*
        Javascript - this is loaded using babel-loader and so, babelrc
        is required. Also note: removing node_modules files here
      */
      test: /\.js[x]?$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_module/
    }, {

      /*
        Note that we are using html-srcsets-loader because
        html-loader does not support srcset attribute
      */
      test: /\.html$/,
      use: [
        {
          loader: 'html-srcsets-loader',
          options: {
            attrs: [
              'img:src',
              'img:srcset',
              'link:href',
              'source:src',
              'source:srcset'
            ]
          }
        }
      ]
    }, {

      /*
        The plugin mini-css-extract-plugin will extract all css into separate
        files. This is useful in production because the extracted files can then
        be passed to optimize-css-assets-webpack-plugin to minify and optimize
        the css
      */
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }, {

      /*
        The plugin mini-css-extract-plugin will extract all css into separate
        files. While that is strictly not required for development, we can use
        mini-css-extract-plugin because its loader already supports hot reloading
      */
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ]
    }, {

      /* Load fonts */
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
    }, {

      /* Load images using file loader */
     test: /\.(png|svg|jpg|mp4|webm)$/,
     use: [{
        loader: 'file-loader',
        options: {
          esModule: false,
          outputPath: 'images',
          name: '[name].[ext]'
        }
      }]
    }]
  },
  plugins: [

    // Delete output directory before each build
    new CleanWebpackPlugin(),

    /*
      Special control for source maps. "fileContext" sets root directory, "filename" sets
      output directory and file name, and "publicPath" sets path prefix to be used to
      reach sourcemaps
    */
    new webpack.SourceMapDevToolPlugin({
      publicPath: 'http://localhost:3000/',
      filename: 'sourcemaps/[name].map',
      fileContext: 'dist',
    }),

    // Extract css into separate files
    new MiniCssExtractPlugin(),

    // Optimize and minimize the extracted css
    new OptimizeCssAssetsWebpackPlugin(),

    // Provide template for index.html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/client/pages/index.html'),
      filename: 'index.html',
    }),

    // Create a compressed file using brotli compression algorithm
    new CompressionWebpackPlugin({
      algorithm: 'brotliCompress',
      filename: '[path].br[query]'
    }),

    // Create a compressed file using gzip compression algorithm
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      filename: '[path].gz[query]'
    }),
  ],

  // Source maps controlled through plugin
  devtool: false,

  /*
    Optimization settings - Mainly want split chunks and minify
  */
  optimization: {

    /*
      Minimization settings: Set minimization on and use Terser plugin
      to minimize js (not using UglifyJS because project uses ES6 code)
    */
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      })
    ],

    /*
      Chunk splitting: Allow splitting of chunks and moving dependencies to
      vendors chunk
    */
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
}