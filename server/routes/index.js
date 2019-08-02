import Router from 'koa-router';
import render from '../../core/render-server';

const router = new Router();

router.get('/', async(ctx) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = render('p1');
});

router.get('/p2', async(ctx) => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = render('p2');
});


export default router;
