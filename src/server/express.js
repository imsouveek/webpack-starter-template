import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../config/webpack.dev.js';

const server = express();

const compiler = webpack(config);
const webpackDevMw = webpackDevMiddleware(compiler, config.devServer);
server.use(webpackDevMw);

const webpackHotMw = webpackHotMiddleware(compiler);
server.use(webpackHotMw);

const staticMw = express.static("dist");
server.use(staticMw);

server.listen(8080, () => {
  console.log("Server is listening");
})