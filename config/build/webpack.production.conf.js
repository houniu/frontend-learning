const path = require('path');
// const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.conf');
const utils = require('./utils');

const PROJECT_DIR = path.join(__dirname, '../../');

module.exports = merge(base, {
  mode: 'production',
  output: {
    path: path.resolve(PROJECT_DIR, './build/'),
    publicPath: './',
    filename: '[name].[chunkhash:8].js',
  },
  devtool: false,
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        common: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
        },
      },
    },
    // runtimeChunk: true;
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`,
    },
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        include: path.join(PROJECT_DIR, 'src'),
        use: 'eslint-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      root: PROJECT_DIR,
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      // chunkFilename: "[id].[hash:8].css"
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   filename: 'sourcemaps/[file].map',
    //   publicPath: sourceMapPublicPath,
    // }),
    ...utils.getPageEntryAndTemplate().map(({ entryName, templateFile }) => {
      return new HtmlWebpackPlugin({
        filename: 'tpls/' + entryName + '/index.ftl',
        chunks: ['polyfill', 'common', entryName],
        meta: {
          pageModel: "${pageModel!''}",
        },
        template: templateFile,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      });
    }),
    ...utils
      .getPageEntryAndTemplate(
        utils.DEFAULT_VUE_PAGES_FOLDER,
        utils.COMMON_VUE_PAGES_TEMPLATE_FILE
      )
      .map(({ entryName, templateFile }) => {
        return new HtmlWebpackPlugin({
          filename: 'tpls/' + entryName + '/index.html',
          chunks: ['polyfill', 'common', entryName],
          meta: {
            pageModel: "${pageModel!''}",
          },
          template: templateFile,
          inject: false,
          minify: {
            removeComments: true,
            collapseWhitespace: true,
          },
        });
      }),
  ],
});
