const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: {
    index: path.resolve(__dirname,'../src/index.js'),
  },
  resolve: {
    alias: {  //别名,引入jQuery之后起的别名
      backbone: path.resolve(__dirname,'../libs/backbone1.3.3.js'), 
      jquery: path.resolve(__dirname,'../libs/jquery-3.2.1.js'),
    }
  },
  plugins: [
    new CleanWebpackPlugin(
      ['*.js','*.map','*.png','*.css','*.html'],　 //匹配删除的文件,若为*则全部删除
      {
        root: path.resolve(__dirname,'../dist'),
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
      }),//清理文件夹
    new HtmlWebpackPlugin({  //指定模板输出
      filename: 'index.html',
      template: './index.html'
    }),
    new webpack.ProvidePlugin({     //自动生成全局变量,一旦引用,就会打包
      $:"jquery",
      jQuery:"jquery",
      'window.jQuery':"jquery",
      'window.$':"jquery",
      _:"underscore",
      underscore:"underscore",
      Backbone: "backbone",
    }),
    new ExtractTextPlugin({
      filename: "[name].bundle.css",
      disable: false,
      allChunks: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader!postcss-loader!less-loader"})
        // use: ['style-loader', 'css-loader?importLoaders=1',"postcss-loader",'less-loader']
      },
      { test: /\.js$/, 
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env"]
          }
        }
      },
      {test: /\.(ico|png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]},
      {
        test: /\.art$/,
        loader: "art-template-loader"
      }
    ]
  },  
  output: {   //打包输出配置路径
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '' //上线的绝对地址  可以为http://www.haohome.top/
  },  
};