const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const crypto = require('crypto');
const fs = require('fs');
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

const manifest = {
  name: "Sheet Maker",
  short_name: "Sheet Maker",
  orientation: "portrait",
  display: "standalone",
  start_url: "/sheet-maker/",
  scope: ".",
  background_color: "#FFF",
  theme_color: "darkred",
  description: "A character sheet for Ars Magica 5e",
  dir: "ltr",
  lang: "en-US",
  icons: [
    { src: "content/app.512x512.png", sizes: "512x512", type: "image/png" },
    { src: "content/app.96x96.png", sizes: "96x96", type: "image/png" }
  ],
  file_handlers: [
    { action: "/sheet-maker/", accept: { "text/json": [".ars"] } },
    { action: "/sheet-maker/", accept: { "text/json": [".json"] } }
  ]
};

// Emits the web app manifest and its icons with content hashes and links the manifest from index.html
class PwaManifestPlugin {
  constructor(manifest) {
    this.manifest = manifest;
  }

  apply(compiler) {
    const { RawSource } = compiler.webpack.sources;
    const hash = content => crypto.createHash('md5').update(content).digest('hex');

    compiler.hooks.thisCompilation.tap('PwaManifestPlugin', compilation => {
      const publicPath = compilation.outputOptions.publicPath;
      let manifestFile;

      compilation.hooks.processAssets.tap(
        { name: 'PwaManifestPlugin', stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
        () => {
          const icons = this.manifest.icons.map(icon => {
            const source = path.resolve(__dirname, icon.src);
            const content = fs.readFileSync(source);
            const file = `icon_${icon.sizes}.${hash(content)}.png`;
            compilation.fileDependencies.add(source);
            compilation.emitAsset(file, new RawSource(content));
            return { ...icon, src: publicPath + file };
          });

          const json = JSON.stringify({ ...this.manifest, icons }, null, 2);
          manifestFile = `manifest.${hash(json)}.json`;
          compilation.emitAsset(manifestFile, new RawSource(json));
        });

      HtmlWebpackPlugin.getCompilationHooks(compilation).alterAssetTagGroups.tap('PwaManifestPlugin', data => {
        data.headTags.push(
          HtmlWebpackPlugin.createHtmlTagObject('meta', { name: 'theme-color', content: this.manifest.theme_color }),
          HtmlWebpackPlugin.createHtmlTagObject('link', { rel: 'manifest', href: publicPath + manifestFile }));
        return data;
      });
    });
  }
}

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
    new PwaManifestPlugin(manifest),
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
      // Aurelia packages pick their development or production build through the mode's export condition
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
