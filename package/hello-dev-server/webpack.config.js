const path = require('path');

module.exports = {
  entry: './src/main.js',
  devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      port: 8085,
  }
};

