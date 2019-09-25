const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

module.exports = {
  entry: {
    main: [path.resolve(__dirname, "../src/client/main.js")]
  },
  mode: "production",
  output: {
    filename: process.env.NODE_ENV === 'production'? "[name]-[hash]-bundle.js" : "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devtool: "source-map",
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
        MiniCssExtractPlugin.loader,
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
  plugins: [
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new MinifyPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      algorithm: "gzip"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/client/index.pug"),
      title: "Starter"
    }),
    new VueLoaderPlugin()
  ]
}
