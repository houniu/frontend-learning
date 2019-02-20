const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');

const base = require('./webpack.base.conf');

const PROJECT_DIR = path.join(__dirname, '../../');

module.exports = merge(base, {
  mode: 'development',
  output: {
    path: path.resolve(PROJECT_DIR, './build/'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // ...utils.getPageEntryAndTemplate().map(({ entryName, templateFile }) => {
    //   return new HtmlWebpackPlugin({
    //     filename: entryName + '/index.html',
    //     chunks: [entryName, 'polyfill'],
    //     template: templateFile,
    //   });
    // }),
    ...utils
      .getPageEntryAndTemplate(
        utils.DEFAULT_VUE_PAGES_FOLDER,
        utils.COMMON_VUE_PAGES_TEMPLATE_FILE
      )
      .map(({ entryName, templateFile }) => {
        return new HtmlWebpackPlugin({
          filename: entryName + '/index.html',
          chunks: [entryName, 'polyfill'],
          template: templateFile,
          inject: false,
        });
      }),
  ],
  devServer: {
    port: 9001,
    open: true,
    inline: true,
    hot: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/tag/template' }],
    },
    // before: function(app) {
    //   app.use((req, res, next) => {
    //     // req.query = {
    //     //   ...req.query,
    //     //   _platformShareData: '{"token":"123","userName":"dulichao","accid":2137588,"prefix":"","role":"test"}'
    //     // }
    //     let url = req.originalUrl || req.url;
    //     if (url.indexOf('?') === -1) {
    //       url += '?';
    //     }
    //     url += `&_platformShareData=${decodeURIComponent(
    //       '{"token":"123","userName":"dulichao","accid":2137588,"prefix":"","roles":"314824", "mis": "dulichao"}'
    //     )}`;
    //     req.url = url;
    //     req.originalUrl = url;
    //     return next();
    //   });
    // },
    // proxy: {
    //   '/category_template': {
    //     // target: 'https://easymock.sankuai.com/mock/5bc6e36d1439ef395b4dd399',
    //     target: 'http://eproductapi.sc.waimai.dev.sankuai.com',
    //     // target: 'http://127.0.0.1:8420',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
