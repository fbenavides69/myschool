const commonPaths = require('./common-paths');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    app: [`${commonPaths.appEntry}/index.jsx`]
  },

  output: {
    filename: 'static/[name].[hash].js'
  },

  devtool: 'source-map',

  module: {
    rules: [
      // Second Rule (CSS|LESS)
      {
        test: /\.(css|less)$/,

        // We configure 'Extract Text Plugin'
        use: ExtractTextPlugin.extract({
          // loader that should be used when the
          // CSS is not extracted
          fallback: 'style-loader',

          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true,
                // Allows to configure how many loaders 
                // before css-loader should be applied
                // to @import(ed) resources
                importLoaders: 2,
                camelCase: true,
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                modules: true,
                // Allows to configure how many loaders 
                // before less-loader should be applied
                // to @import(ed) resources
                camelCase: true,
                sourceMap: true
              }
            },
            {
              // PostCSS will run before css-loader and will 
              // minify and autoprefix our CSS rules. We are also
              // telling it to only use the last 2 
              // versions of the browsers when autoprefixing
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
        })
      }
    ]
  },

  plugins: [
    // Create the stylesheet under 'styles' directory
    new ExtractTextPlugin({
      filename: 'styles/styles.[hash].css',
      allChunks: true
    })
  ]
};