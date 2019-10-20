const webpack = require('webpack');
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;

module.exports = {
  name: "client",
  entry: {
    main: [
      "webpack-hot-middleware/client?reload=true",
      path.resolve(__dirname, "../src/client/main.js")
    ]
  },
  mode: "development",
  output: {
    filename: "[name]-bundle.js",
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
      test: /\.md$/,
      use: ["markdown-with-front-matter-loader"]
    }, {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: true,
            reloadAll: true,
          }
        },
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
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    overlay: true,
    hot: true,
    writeToDisk: true,
    serverSideRender: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new VueLoaderPlugin()
  ]
}
