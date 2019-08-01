import Koa from 'koa';
import Router from 'koa-router';
import Static from 'koa-static';
import { renderToString } from 'react-dom/server';
import webpack from 'webpack';

import webpackConfig from '../configs/webpack.config';

const compiler  = webpack(webpackConfig);
const watching = compiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
    }
    console.log(stats.toString({ colors: true }));
});