const path = require('path');

const webpackConfig = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '..', 'server', 'nginx', 'www', 'js')
  },
  mode: process.env.NODE_ENV ? 'production' : 'development',
  devtool: process.env.NODE_ENV ? 'eval' : 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-class-properties']
          }
        }
      }
    ]
  }
};

module.exports = webpackConfig;
