import * as path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import React from 'react';
import ReactDOM from 'react-dom/server';

import renderJSX from './lib/render.jsx';
import App from './demo/App.jsx';
import pkg from './package.json';

const RENDER_UNIVERSAL = true;
const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = __dirname;
const config = {
  paths: {
    src: path.join(ROOT_PATH, 'src'),
    demo: path.join(ROOT_PATH, 'demo')
  },
  filename: 'react-pagify',
  library: 'ReactPagify'
};
const CSS_PATHS = [
  config.paths.demo,
  path.join(ROOT_PATH, 'style.css'),
  path.join(ROOT_PATH, 'node_modules/bootstrap/dist/css/bootstrap.css'),
  path.join(ROOT_PATH, 'node_modules/highlight.js/styles/github.css'),
  path.join(ROOT_PATH, 'node_modules/react-ghfork/gh-fork-ribbon.ie.css'),
  path.join(ROOT_PATH, 'node_modules/react-ghfork/gh-fork-ribbon.css')
];
const STYLE_ENTRIES = [
  'bootstrap/dist/css/bootstrap.css',
  'highlight.js/styles/github.css',
  'react-ghfork/gh-fork-ribbon.ie.css',
  'react-ghfork/gh-fork-ribbon.css',
  './demo/main.css'
];

process.env.BABEL_ENV = TARGET;

const demoCommon = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg']
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        loader: 'url?limit=100000&mimetype=image/png',
        include: config.paths.demo
      },
      {
        test: /\.jpg$/,
        loader: 'file',
        include: config.paths.demo
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: [
          path.join(ROOT_PATH, 'package.json'),
          path.join(ROOT_PATH, 'node_modules/cumberbatch-name/words.json')
        ]
      },
      {
          test: /\.(woff2|woff|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file',
          include: path.join(ROOT_PATH, 'node_modules/bootstrap')
      }
    ]
  }
};

if (TARGET === 'start') {
  module.exports = merge(demoCommon, {
    devtool: 'eval-source-map',
    entry: {
      demo: [config.paths.demo].concat(STYLE_ENTRIES)
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      }),
      new HtmlWebpackPlugin(Object.assign({}, {
        title: pkg.name + ' - ' + pkg.description,
        template: 'lib/index_template.ejs',

        inject: false
      }, renderJSX(__dirname, {
        ...pkg,
        description: pkg.description.replace(/react-pagify/g, '<a href="https://github.com/bebraw/react-pagify">react-pagify</a>')
      }))),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css'],
          include: CSS_PATHS
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: [
            config.paths.demo,
            config.paths.src
          ]
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      stats: 'errors-only'
    }
  });
}

function NamedModulesPlugin(options) {
  this.options = options || {};
}
NamedModulesPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('before-module-ids', function(modules) {
      modules.forEach(function(module) {
        if(module.id === null && module.libIdent) {
          var id = module.libIdent({
            context: this.options.context || compiler.options.context
          });

          // Skip CSS files since those go through ExtractTextPlugin
          if(!id.endsWith('.css')) {
            module.id = id;
          }
        }
      }, this);
    }.bind(this));
  }.bind(this));
};

if (TARGET === 'gh-pages' || TARGET === 'gh-pages:stats') {
  module.exports = merge(demoCommon, {
    entry: {
      app: config.paths.demo,
      style: STYLE_ENTRIES
    },
    output: {
      path: './gh-pages',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      new Clean(['gh-pages'], {
        verbose: false
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.DefinePlugin({
          // This affects the react lib size
        'process.env.NODE_ENV': '"production"'
      }),
      new HtmlWebpackPlugin(Object.assign({}, {
        title: pkg.name + ' - ' + pkg.description,
        template: 'lib/index_template.ejs',
        inject: false
      }, renderJSX(
        __dirname, pkg, RENDER_UNIVERSAL ? ReactDOM.renderToString(<App />) : '')
      )),
      new NamedModulesPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: CSS_PATHS
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            config.paths.demo,
            config.paths.src
          ]
        }
      ]
    }
  });
}
