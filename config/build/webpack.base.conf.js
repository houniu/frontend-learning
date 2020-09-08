const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const os = require('os');
const AutoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const utils = require('./utils');

const { NODE_ENV, BUILD_ANALYSIS } = process.env;
const isProductMode = NODE_ENV === 'production';

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});

const PROJECT_DIR = path.join(__dirname, '../../');

const webpackConfig = {
  context: process.cwd(),
  mode: 'production',
  entry: {
    polyfill: '@babel/polyfill',
    // ...utils.getPageEntries(),
    ...utils.getPageEntries(utils.DEFAULT_VUE_PAGES_FOLDER),
  },
  resolve: {
    alias: {
      '@': path.resolve(PROJECT_DIR, './src'),
      '@leetcode': path.resolve(PROJECT_DIR, './leetcode'),
    },
    extensions: ['.ts', '.js', '.vue', '.jsx', 'json'],
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
    vue: 'Vue',
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|es-us/),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.jsx?$/,
        use: ['cache-loader', 'happypack/loader?id=js'],
        include: path.join(PROJECT_DIR, 'src'),
      },
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                AutoPrefixer({
                  overrideBrowserslist: ['ie >= 9', 'last 2 versions'],
                }), // 自动添加css前缀
              ],
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          isProductMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              camelCase: true,
              modules: true,
              getLocalIdent: (context, localIdentName, localName) => {
                if (
                  context.resourcePath.includes('node_modules') ||
                  context.resourcePath.includes('global.less')
                ) {
                  return localName;
                }
                const match = context.resourcePath.match(/src(.*)/);
                if (match && match[1]) {
                  const relPath = match[1]
                    .replace('index.less', '')
                    .replace('.less', '');
                  const arr = relPath
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                  return `reco-product${arr.join('-')}-${localName}`.replace(
                    /--/g,
                    '-'
                  );
                }
                return localName;
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                AutoPrefixer({
                  overrideBrowserslist: ['ie >= 9', 'last 2 versions'],
                }), // 自动添加css前缀
              ],
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          isProductMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              getLocalIdent: (context, localIdentName, localName) => {
                if (
                  context.resourcePath.includes('node_modules') ||
                  context.resourcePath.includes('global.less')
                ) {
                  return localName;
                }
                const match = context.resourcePath.match(/src(.*)/);
                if (match && match[1]) {
                  const relPath = match[1]
                    .replace('index.less', '')
                    .replace('.less', '');
                  const arr = relPath
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                  return `reco-product${arr.join('-')}-${localName}`.replace(
                    /--/g,
                    '-'
                  );
                }
                return localName;
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                AutoPrefixer({
                  overrideBrowserslist: ['ie >= 9', 'last 2 versions'],
                }), // 自动添加css前缀
              ],
            },
          },
        ],
      },
    ],
  },
};

if (BUILD_ANALYSIS) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
