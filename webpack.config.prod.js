const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpack = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const dll = require('./modules-manifest.json');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    publicPath: 'https://arzatecompany.github.io/finalProjectPlatziMaster/',
  },
  mode: 'production',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000,
            name: '[hash].[ext]',
            outputPath: 'assets',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'OurClothe',
      template: path.resolve(__dirname, './public/index.html'),
    }),
    new webpack.DllReferencePlugin({
      manifest: dll,
    }),
    new AddAssetHtmlWebpack({
      filepath: path.resolve(__dirname, './dist/*.dll.js'),
      publicPath: 'https://arzatecompany.github.io/finalProjectPlatziMaster/',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*'],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
};
