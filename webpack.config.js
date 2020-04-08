/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/App.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(mp4|wav|mov?)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '#': path.resolve(__dirname, './assets'),
    },
    extensions: ['.ts', '.js', '.tsx'],
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'assets',
        to: 'assets',
        ignore: ['.DS_Store'],
      },
      {
        from: 'public',
        ignore: ['.DS_Store'],
      },
    ]),
  ],
}
