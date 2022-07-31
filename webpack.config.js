/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const cssLoader = 'css-loader';


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer']
    }
  }
};

function createPlugins(production, analyze) {
  let plugins = [
    new HtmlWebpackPlugin({ template: 'index.html', favicon: 'favicon.ico' }),
    new Dotenv({
      path: `./.env${production ? '' :  '.' + (process.env.NODE_ENV || 'development')}`,
    }),
    analyze && new BundleAnalyzerPlugin()
  ];
  if (!production) return plugins;

  return [...plugins,
    new WebpackPwaManifest({
    name: "Sheet Maker",
    short_name: "Sheet Maker",
    start_url: "/sheet-maker/",
    scope: ".",
    display: "standalone",
    background_color: "#FFF",
    theme_color: "darkred",
    description: "A character sheet for Ars Magica 5e",
    dir: "ltr",
    lang: "en-US",
    icons: [{
        src: "content/app.96x96.png",
        type: "image/png",
        sizes: "96x96"
    }, {
        src: "content/app.512x512.png",
        type: "image/png",
        sizes: "512x512"
    }],
    "file_handlers": [{
      action: "/sheet-maker/",
      accept: {
        "text/json": [".ars"]
      }
    }, {
      action: "/sheet-maker/",
      accept: {
        "text/json": [".json"]
      }
    }]
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 60000000
    })];
}

module.exports = function(env, { analyze }) {
  const production = env.production || process.env.NODE_ENV === 'production';
  return {
    target: 'web',
    mode: production ? 'production' : 'development',
    devtool: production ? undefined : 'eval-cheap-source-map',
    entry: {
      entry: './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
      publicPath: '/sheet-maker/'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'dev-app'), 'node_modules'],
      alias: production ? {
        ...[
          // These two were required when using the Aurelia router
          'kernel',
          'runtime-html',
        ].reduce((map, pkg) => {
          const name = `@aurelia/${pkg}`;
          map[name] = path.resolve(__dirname, 'node_modules', name, 'dist/esm/index.mjs');
          return map;
        }, {
          // add your production aliasing here
        })
      } : {
        ...[
          'fetch-client',
          'kernel',
          'metadata',
          'platform',
          'platform-browser',
          'plugin-conventions',
          'route-recognizer',
          'router',
          'router-lite',
          'runtime',
          'runtime-html',
          'testing',
          'webpack-loader',
        ].reduce((map, pkg) => {
          const name = `@aurelia/${pkg}`;
          map[name] = path.resolve(__dirname, 'node_modules', name, 'dist/esm/index.dev.mjs');
          return map;
        }, {
          'aurelia': path.resolve(__dirname, 'node_modules/aurelia/dist/esm/index.dev.mjs'),
          // add your development aliasing here
        })
      }
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000
    },
    module: {
      rules: [
        { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset' },
        { test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,  type: 'asset' },
        { test: /\.css$/i, use: [ 'style-loader', cssLoader, postcssLoader ] },
        { test: /\.ts$/i, use: ['ts-loader', '@aurelia/webpack-loader'], exclude: /node_modules/ },
        {
          test: /[/\\]src[/\\].+\.html$/i,
          use: '@aurelia/webpack-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: createPlugins(production, analyze).filter(p => p)
  }
}
