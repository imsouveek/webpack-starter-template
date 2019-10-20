const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

module.exports = {
  name: "client",
  entry: {
    main: [path.resolve(__dirname, "../src/client/main.js")]
  },
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
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
      test: /\.md$/,
      use: ["markdown-with-front-matter-loader"]
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
  optimization: {
    splitChunks:{
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "../src/client/index.pug"),
    //   title: "Starter"
    // }),
    new VueLoaderPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new MinifyPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      filename: "[path].gz[query]"
    }),
    new CompressionPlugin({
      algorithm: "brotliCompress",
      filename: "[path].br[query]"
    })
  ]
}
