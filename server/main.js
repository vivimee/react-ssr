import Koa from 'koa';
import Router from 'koa-router';
import KoaStatic from 'koa-static';
import { renderToString } from 'react-dom/server';
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';
import React from 'react';

import webpackConfig from '../configs/webpack.config';

const compiler  = webpack(webpackConfig);
const watching = compiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    }
    console.log(stats.toString({ colors: true }));
});

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
    const htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../static/html/p1.html')).toString();
    const App = require('../client/pages/p1').default;
    const html = htmlTemplate.replace("<!-- react-doms -->", renderToString(<App />));
    ctx.set('Content-Type', 'text/html');
    ctx.body = html;
});

app.use(router.routes()).use(router.allowedMethods());
app.use(KoaStatic(path.resolve(__dirname, "../static")));

app.listen(7000);
