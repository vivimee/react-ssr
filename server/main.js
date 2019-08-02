import Koa from 'koa';
import Router from 'koa-router';
import KoaStatic from 'koa-static';
import webpack from 'webpack';
import path from 'path';

import webpackConfig from '../configs/webpack.config';
import router from './routes';

const compiler  = webpack(webpackConfig);
const watching = compiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    }
    console.log(stats.toString({ colors: true }));
});

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());
app.use(KoaStatic(path.resolve(__dirname, "../static")));

app.listen(7000);
