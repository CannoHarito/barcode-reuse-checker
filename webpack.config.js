const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');//add
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');//add

const destination = 'dist';

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/client/index-template.html",
  filename: "index.html",
  inlineSource: '.(js|css)$' // embed all javascript and css inline
});

// const htmlWebpackInlineSourcePlugin = new HtmlWebpackInlineSourcePlugin();

const sharedConfigSettings = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          ie8: false,//true,
          mangle: false,
          compress: {
            properties: false
          },
          output: {
            beautify: false//true
          }
        }
      })
    ]
  },
  module: {},
};

const eslintConfig = {
  enforce: 'pre',
  test: /\.jsx?$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: false,
    failOnError: false,
    fix: true
  }
};

const appsscriptConfig = {
  name: "COPY APPSSCRIPT.JSON",
  entry: "./appsscript.json",
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './appsscript.json'
      }
    ])
  ]
};

const clientConfig = Object.assign({}, sharedConfigSettings, {
  name: "CLIENT",
  entry: "./src/client/index.jsx",
  output: {
    path: path.resolve(__dirname, destination)
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    htmlPlugin,
    new DynamicCdnWebpackPlugin(),//add
    // new HtmlWebpackInlineSourcePlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: ['main.js']
    }),
  ]
});

const serverConfig = Object.assign({}, sharedConfigSettings, {
  name: "SERVER",
  entry: "./src/server/code.js",
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, destination),
    libraryTarget: 'this'
  },
  module: {
    rules: [
      // eslintConfig,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
  plugins: [
    new GasPlugin()
  ]
});

const libraryConfig = {
  name: "COPY library js",
  entry: "./src/server/escapeSjis.js",
  plugins: [
    new CleanWebpackPlugin([destination]),
    new CopyWebpackPlugin([
      {
        from: './src/server/escapeSjis.js'
      }
    ])
  ]
};

module.exports = [
  appsscriptConfig,
  libraryConfig,
  clientConfig,
  serverConfig,
];

// yarn add -D dynamic-cdn-webpack-plugin module-to-cdn
// yarn add -D script-ext-html-webpack-plugin
// yarn remove html-webpack-inline-source-plugin
