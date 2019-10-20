const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");
const VueLoaderPlugin = require("vue-loader").VueLoaderPlugin;
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = {
  name: "server",
  entry: {
    vueApp: [path.resolve(__dirname, "../src/server/entry-server.js")]
  },
  mode: "production",
  target: "node",
  output: {
    filename: process.env.NODE_ENV === 'production'? "[name]-[hash]-bundle.js" : "[name]-bundle.js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
  externals: nodeExternals({
    whitelist: /\.css/
  }),
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
        "vue-style-loader",
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
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new VueSSRServerPlugin()
  ]
}
