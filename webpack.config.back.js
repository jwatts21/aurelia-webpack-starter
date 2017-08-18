var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AureliaWebpackPlugin = require('aurelia-webpack-plugin');
var project = require('./package.json');

const DEBUG = true;
const title = 'Aurelia Navigation Skeleton';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('www2/src');
const outDir = path.resolve('dist');

const aureliaBootstrap = [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal-browser',
    'regenerator-runtime'
  ];


 // resolve: { 
 //      symlinks: false,
 //      modules: [
 //        path.resolve(__dirname, '../../..', 'node_modules'),
 //        'node_modules'
 //       ],
 //    },


const aureliaModules = Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'));

console.log('Aurelia Modules')
console.log(aureliaModules)
module.exports = {

    entry: {
        'app': ['aurelia-bootstrapper-webpack'],
        'aurelia-bootstrap': aureliaBootstrap,
        'aurelia-modules': aureliaModules.filter(pkg => aureliaBootstrap.indexOf(pkg) === -1)
    },

     resolve: { 
      symlinks: false,
      extensions: ['.js', '.jsx', '.es6' ],
      modules: [
        path.resolve(__dirname, '../../..', 'node_modules'),
        'node_modules'
       ],
    },


  resolveLoader: { 
      symlinks: false,
      extensions: ['.js', '.jsx', '.es6' ],
      modules: [
        path.resolve(__dirname, '../../..', 'node_modules'),
        'node_modules'
       ],
    },

    output: {
        path: outDir,
        filename: '[name]-bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules/, // include: path.resolve('src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-1'],
                    plugins: ['transform-decorators-legacy']
                }
            }, {
                test: /\.html$/,
                exclude: /index\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)(\?\S*)?$/,
                loader: 'url-loader?limit=100000&name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            regeneratorRuntime: 'regenerator-runtime', // to support await/async syntax
            Promise: 'bluebird', // because Edge browser has slow native Promise object
            $: 'jquery', // because 'bootstrap' by Twitter depends on this
            jQuery: 'jquery', // just an alias
            'window.jQuery': 'jquery' // this doesn't expose jQuery property for window, but exposes it to every module
        }),
        new HtmlWebpackPlugin({
            title: title,
            template: 'www/index.html',
            chunksSortMode: 'dependency'
        }),
        new AureliaWebpackPlugin({
            root: rootDir,
            src: srcDir,
            title: title,
            baseUrl: baseUrl
        }),
        new CopyWebpackPlugin([{
            from: 'favicon.ico',
            to: 'favicon.ico'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['aurelia-modules', 'aurelia-bootstrap']
        }),
    ]
};
