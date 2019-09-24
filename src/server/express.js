import express from 'express';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';
const server = express();

if (!isProd) {
  const webpack = require('webpack')
  const webpackDevConfig = require('../../config/webpack.dev.js')
  const webpackDevMidlleware = require('webpack-dev-middleware');

  const compiler = webpack(webpackDevConfig);
  const webpackDevMw = webpackDevMidlleware(compiler, webpackDevConfig.devServer);
  server.use(webpackDevMw);

  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotMw = webpackHotMiddleware(compiler);
  server.use(webpackHotMw);
}
const staticMw = express.static("dist");
server.use(staticMw);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})