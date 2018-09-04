const commonPaths = require('./common-paths');

const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
  mode: 'development',

  entry: {
    app: `${commonPaths.appEntry}/index.jsx`
  },

  output: {
    filename: '[name].[hash].js'
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  autoprefixer: {
                    browsers: 'last 2 versions'
                  }
                }
              }
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true,
    contentBase: path.join(__dirname, 'public'),
    hot: true
  }

};