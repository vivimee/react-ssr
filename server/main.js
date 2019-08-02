import Koa from 'koa';
import Router from 'koa-router';
import KoaStatic from 'koa-static';
import webpack from 'webpack';
import path from 'path';

import webpackConfig from '../configs/webpack.config';
import render from '../core/render-server';

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
    ctx.set('Content-Type', 'text/html');
    ctx.body = render('p1');
});

router.get('/p4', (ctx) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = render('p4');
});

app.use(router.routes()).use(router.allowedMethods());
app.use(KoaStatic(path.resolve(__dirname, "../static")));

app.listen(7000);
