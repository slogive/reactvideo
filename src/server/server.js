/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import serverRouters from '../frontend/routes/serverRouters';
import reducer from '../frontend/reducers';
import initialState from '../frontend/initialState';
import Layout from '../frontend/components/Layout';
import getManifest from './getManifest';

const app = express();
dotenv.config();

const { ENV, PORT } = process.env;

if (ENV === 'development') {
  console.log(`${ENV} config`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { serverSideRender: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet(helmet.permittedCrossDomainPolicies()));
  app.disable('x-powered-by');
}

const setResponse = (html, preLoadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>React Video</title>
            <link rel="stylesheet" href="${mainStyles}" type="text/css">
            </head>
        <body>
            <div id="root">${html}</div>
            <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preLoadedState).replace(/</g, '\\u003c')}</script>
            <script src="${mainBuild}" type="text/jsx"></script>
            <script src="${vendorBuild}" type="text/jsx"></script>
        </body>
    </html>
    `
  );
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const preLoadedState = store.getState();
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          {renderRoutes(serverRouters)}
        </Layout>
      </StaticRouter>
    </Provider>,
  );

  res.removeHeader('x-powered-by');
  res.send(setResponse(html, preLoadedState, req.hashManifest));
};

app.get('*', renderApp);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Server running on port: ${PORT} - ${ENV}`);
});
