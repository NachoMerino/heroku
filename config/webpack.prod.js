const path = require('path');
const webpack = require('webpack');
const ExtracTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtracTextPlugin({
  filename: "[name].[contenthash].css"
})

module.exports = {
  entry: {
    main: ['./src/main.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    stats: {
      colors: true
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'sass-loader' },
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src']
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtracTextPlugin('[name].css'),
    extractSass,
    new webpack.NamedModulesPlugin()
  ]
}
