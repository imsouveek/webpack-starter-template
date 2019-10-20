import express from 'express';
import { resolve } from 'path';
import webpack from 'webpack';
import memoryFs from 'memory-fs';
import { createBundleRenderer } from 'vue-server-renderer';

import renderSSR from './render';
import configDevClient, { devServer } from "../../config/webpack.dev-client";
import configProdClient from "../../config/webpack.prod-client";
import configDevServer from "../../config/webpack.dev-server";
import configProdServer from "../../config/webpack.prod-server";

const isProd = process.env.NODE_ENV === 'production';
const server = express();

let bundle;
let renderer;
let options = {
  runInNewContext: false
};

if (!isProd) {

  const compiler = webpack([configDevClient, configDevServer]);
  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  const webpackDevMidlleware = require('webpack-dev-middleware');
  const webpackDevMw = webpackDevMidlleware(clientCompiler, devServer);
  server.use(webpackDevMw);

  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotMw = webpackHotMiddleware(clientCompiler, devServer);
  server.use(webpackHotMw);

  const mfs = new memoryFs();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, () => {
    bundle = JSON.parse(mfs.readFileSync(resolve(__dirname, '../../build/vue-ssr-server-bundle.json')));
    renderer = createBundleRenderer(bundle, options);

    const staticMw = express.static("dist");
    server.use(staticMw);

  server.use(renderSSR(renderer));
  })


} else {

  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const staticGzipMw = require('express-static-gzip');
    bundle = resolve(__dirname, "../../build/vue-ssr-server-bundle.json");
    renderer = createBundleRenderer(bundle, options);

    server.use(staticGzipMw("dist", {
      enableBrotli: true,
      orderPreference: ["br"]
    }));

    server.use(renderSSR(renderer))
  })
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})