// module.exports = {
//     entry: "./source/javascripts/simulate.js",
//     output: {
//         path: __dirname,
//         filename: "bundle.js"
//     },
//     module: {
//         loaders: [
//             // { test: /\.css$/, loader: "style!css" }
//         ]
//     }
// };

var webpack = require('webpack');

module.exports = {
  entry: {
    simulate: './source/javascripts/simulate.js'
  },

  resolve: {
    root: __dirname + '/source/javascripts',
  },

  output: {
    path: __dirname + '/.tmp/dist',
    filename: 'javascripts/[name].js',
  },
};