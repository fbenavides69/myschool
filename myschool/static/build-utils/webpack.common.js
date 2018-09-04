const commonPaths = require('./common-paths');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: {
    vendor: [
      'semantic-ui-react'
    ]
  },
  
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },

  // Find the JavaScript/JSX files
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },

  module: {
    rules: [

      // First Rule (JavaScript/JSX)
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {'modules': false}],
              'react',
              'stage-1'
            ],
            plugins: [
              'transform-class-properties',
              'react-hot-loader/babel'
            ],
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        }, 
      }
    ]
  },

  // Split by Vendor
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: '../templates/index.html',
      favicon: 'img/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunkSortMode: 'dependency'
    })
  ]

};