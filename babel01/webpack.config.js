const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'src'),
      query: {
        presets: ['es2015']
      }
    }]
  },
};
