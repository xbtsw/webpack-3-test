const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./index.tsx",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    mainFields: ['browser', 'module', 'main']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}