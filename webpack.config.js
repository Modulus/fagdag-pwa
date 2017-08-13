var path = require('path');

const config = {
  entry: {
    app: './src/app.js',
    sw: './src/sw.js'
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Services: path.resolve(__dirname, 'src/services/')
    }
  }
};

module.exports = config;
