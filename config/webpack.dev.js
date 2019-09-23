const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    main: [path.resolve(__dirname, "../src/main.js")]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          attrs: ["img:src"]
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.(jpg|png)$/,
      use:[{
        loader: "file-loader",
        options: {
          name: "[name][ext]",
          outputPath: "images"
        }
      }]
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    overlay: true,
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    })
  ]
}
