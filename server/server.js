const root = '.'
const opts = {
  hidden: false,
  defer: true,
  gzip: true
}

var server = require('koa-static')(root, opts)
import path from 'path';
import koa from 'koa';
import cors  from 'koa-cors';
import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import router from './router';
import advice from './error/advice';
import config from './config';

//注册实体
import * as model from './model'

const app = koa();

app.use(server);

//全局异常
app.use(advice);

//跨域
app.use(cors());

//fetch body 参数支持
app.use(parser({
    jsonLimit: '50mb',
}));

//日志
app.use(logger())

//路由
router.routes(app);

app.listen(config.app.port, function () {
  console.log('server listening on %d, in %s mode', config.app.port, app.env);
});
