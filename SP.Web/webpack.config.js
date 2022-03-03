const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const Terser = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',
  //load from here
  entry: path.join(__dirname, 'out', 'app'),
  watch: true,
  output: {
    path: path.join(__dirname, 'app'),
    publicPath: '/app/',
    filename: "bundle.js",
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        query: {
          presets: [
            ["@babel/env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }]
          ]
        }
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/app/'),
    inline: true,
    hot: true,
    host: 'localhost',
    port: 8080,
    //historyApiFallback: true,
    historyApiFallback: {
      index: 'index.html'
    },
    output: {
      //  must specified output.publicPath otherwise
      //  devServer.historyApiFallback will not work
      publicPath: '/'
    },
  },
  // optimization: {
  //   minimizer: [new OptimizeCssAssetsPlugin({
  //     assetNameRegExp: /\.optimize\.css$/g,
  //     cssProcessor: require('cssnano'),
  //     cssProcessorPluginOptions: {
  //       preset: ['default', {
  //         discardComments: {
  //           removeAll: true
  //         }
  //       }],
  //     },
  //     canPrint: true
  //   }), new Terser()]
  // },
  plugins: [
    new HtmlWebPackPlugin({
      template: "mainpage.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
      chunkFilename: '[id].css'
    })
  ]
};