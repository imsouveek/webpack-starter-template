const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

module.exports = {
  entry: {
    main: [
      "webpack-hot-middleware/client?reload=true",
      path.resolve(__dirname, "../src/client/main.js")]
  },
  mode: "development",
  output: {
    filename: process.env.NODE_ENV === 'production'? "[name]-[hash]-bundle.js" : "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      use: ["vue-loader"]
    }, {
      test: /\.js$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.pug$/,
      oneOf: [{
        resourceQuery: /^\?vue/,
        use: ['pug-plain-loader']
      },{
        use: [
          "raw-loader",
          "pug-plain-loader"
        ]
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
          name: "[name].[ext]",
          outputPath: "images"
        }
      }]
    }]
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
    },
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/client/index.pug"),
      title: "Starter"
    }),
    new VueLoaderPlugin()
  ]
}
