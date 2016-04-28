var path = require('path');
var webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

   entry: ( NODE_ENV == 'production') ?
  {
    generation: ['babel-polyfill', './src/generation'],
    interview: ['babel-polyfill', './src/interview'],
    report: ['babel-polyfill', './src/report']
  }
  :
  [
    'webpack-hot-middleware/client', // Для поддержки hot-reload
    'babel-polyfill',
    // './src/generation' //Генерация формы
    // './src/interview' //Анкета
    './src/report' //Отчет
  ],

  output: ( NODE_ENV == 'production') ? 
  {
    path: path.join(__dirname, 'dist/scripts'),
    filename: '[name].js'
  }
  :
  {
    path: path.join(__dirname, 'dist/scripts'),
    filename: 'home.js',
    publicPath: '/static/'
  },

  devtool: NODE_ENV == 'development' ? 'cheap-module-eval-source-map' : null,

  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // Для поддержки hot-reload
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
        loaders: ['react-hot', 'babel-loader'],
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        plugins: ['transform-runtime'],
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" }
    ]
  }
};

loaders: [
  
]

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}