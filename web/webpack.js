const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader"
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html'
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  mode: "development"
}