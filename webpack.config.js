var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {

  entry: {
    generation: ['babel-polyfill', './src/entries/generation'],
    interview: ['babel-polyfill', './src/entries/interview'],
    report: ['babel-polyfill', './src/entries/report'],
    main: ['babel-polyfill', './src/entries/main']
  },

  output: {
    path: path.join(__dirname, '../superforms/public/scripts'),
    filename: '[name].js'
  },

  watch: true,

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  module: {
    preLoaders: [ //добавили ESlint в preloaders
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, "src"),
        ],
      }
    ],

    loaders: [
      //Все js файлы в src директории будут обрабатываться babel-loader'ом
      //hot-reload для React компонентов
      {
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
      { test: /\.css$/, loader: "style-loader!css-loader?&name=../styles/[name].[ext]" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader?&name=../styles/[name].[ext]" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff&name=../fonts/[name].[ext]" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?&name=../fonts/[name].[ext]" }
    ]
  }
};

// if (NODE_ENV == 'prod') {
//   module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//         drop_console: true,
//         unsafe: true
//       }
//     })
//   );
// }

//'dev' ? '#cheap-module-eval-source-map' : null,