const express = require('express');
// const logger = require('koa-logger')
// import KoaRouter from 'koa-router'
// import staticServe from 'koa-static-server'
const _debug = require('debug');
const path = require('path');
// const fs = require('fs');
// const glob = require('fast-glob');
const { NODE_ENV } = process.env;
const debug = _debug('koa:server');

const app = express();
// app.use(logger())
//
// const router = new KoaRouter()
// // 注册路由
// app.use(router.routes()) // 添加路由中间件

app.engine('art', require('express-art-template'));
app.engine('html', require('express-art-template'));

app.set('views', path.join(__dirname, 'build/tpls/product/test'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
});

// if (app.env === 'production') {
//   debug('production environment...')
//
//   const staticPath = path.resolve(__dirname, '../build')
//   app.use(staticServe({ rootDir: staticPath, rootPath: '/' }))
// } else {
//   debug('development environment...')
// }

if (NODE_ENV === 'production') {
  debug('production environment...');

  const staticPath = path.resolve(__dirname, 'build');
  app.use(express.static(staticPath));
} else {
  debug('development environment...');
}

app.use((req, res) => {
  res.render('index.html');
});

const port = 3002;
module.exports = app.listen(process.env.PORT || port, err => {
  if (err) {
    debug(err);
    return;
  }
  debug(`Server is now running at port ${port}.`);
});
