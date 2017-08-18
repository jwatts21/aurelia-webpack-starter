var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AureliaWebpackPlugin = require('aurelia-webpack-plugin');
var project = require('./package.json');


process.env.BABEL_ENV = 'webpack'
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || (process.env.NODE_ENV = 'development')

const DEBUG = true;
const title = 'Aurelia Navigation Skeleton';
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('www/src');
const outDir = path.resolve('dist');


// const coreBundles = {
//   bootstrap: [
//     'aurelia-bootstrapper-webpack',
//     'aurelia-polyfills',
//     'aurelia-pal',
//     'aurelia-pal-browser',
//     'regenerator-runtime',
//     'bluebird',
//   ],
//   // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
//   aurelia: [
//     'aurelia-dialog',
//     'aurelia-event-aggregator',
//     'aurelia-framework',
//     'aurelia-history-browser',
//     'aurelia-loader',
//     'aurelia-loader-webpack',
//     'aurelia-logging',
//     'aurelia-logging-console',
//     'aurelia-metadata',
//     'aurelia-pal',
//     'aurelia-pal-browser',
//     'aurelia-path',
//     'aurelia-polyfills',
//     'aurelia-route-recognizer',
//     'aurelia-router',
//     'aurelia-templating',
//     'aurelia-templating-binding',
//     'aurelia-templating-router',
//     'aurelia-templating-resources',
//     "aurelia-validatejs",
//     "aurelia-validation",
//     "aurelia-webpack-plugin"
//   ]
// }


//   aurelia: [
//     'aurelia-bootstrapper-webpack',
//     'aurelia-binding',
//     'aurelia-dialog',
//     'aurelia-dependency-injection',
//     'aurelia-event-aggregator',
//     'aurelia-framework',
//     'aurelia-history',
//     'aurelia-history-browser',
//     'aurelia-loader',
//     'aurelia-loader-webpack',
//     'aurelia-logging',
//     'aurelia-logging-console',
//     'aurelia-metadata',
//     'aurelia-pal',
//     'aurelia-pal-browser',
//     'aurelia-path',
//     'aurelia-polyfills',
//     'aurelia-route-recognizer',
//     'aurelia-router',
//     'aurelia-task-queue',
//     'aurelia-templating',
//     'aurelia-templating-binding',
//     'aurelia-templating-router',
//     'aurelia-templating-resources',
//     "aurelia-validatejs",
//     "aurelia-validation"
//   ]
// }



const aureliaBootstrap = [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal-browser',
    'regenerator-runtime',
];



const aureliaModules = Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'));
console.log('Aurelia Modules')
console.log(aureliaModules)
module.exports = {

    // entry: {
    //     'app': ['./www/src/main'],
    //     'aurelia-bootstrap': aureliaBootstrap,
    //     'aurelia': coreBundles.aurelia.filter(pkg => {
    //          console.log(`${pkg} : ${coreBundles.bootstrap.indexOf(pkg) === -1}`)
    //         return coreBundles.bootstrap.indexOf(pkg) === -1

    //         })
    // },

    entry: {
        'app': ['./www/src/main'],
        'aurelia-bootstrap': aureliaBootstrap,
        'aurelia-modules': aureliaModules.filter(pkg => aureliaBootstrap.indexOf(pkg) === -1)
    },


    output: {
        path: outDir,
        filename: '[name]-bundle.js',
        publicPath: '/'
    },
    module: {

        // rules:[
        //      {
        //       test: /\.js$/,
        //       exclude: /node_modules/,
        //       loader: 'jshint-loader'
        //      }
        // ],

       rules: [
          // {
          //    test: /\.js$/, // include .js files
          //    exclude: /node_modules/, // exclude any and all files in the node_modules folder
          //    use:[
          //      'jshint-loader',
          //      { loader: "jshint-loader", options: { camelcase: true, emitErrors: true, failOnHint: false } }
          //    ]
          // },
           { test: /\.json$/, loader: 'json-loader'},
             {
                 test: /\.js$/,
                 exclude: /node_modules/, // include: path.resolve('src'),
                 loader: 'babel-loader'
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
        //loaders: [
            //{ test: /\.json$/, loader: 'json-loader'},
            //{
                //test: /\.js$/,
                //exclude: /node_modules/, // include: path.resolve('src'),
                //loader: 'babel-loader'
            //}, {
                //test: /\.html$/,
                //exclude: /index\.html$/,
                //loader: 'html-loader'
            //}, {
                //test: /\.css$/,
                //loaders: ['style-loader', 'css-loader']
            //}, {
                //test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)(\?\S*)?$/,
                //loader: 'url-loader?limit=100000&name=[name].[ext]'
            //}
        //]
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
            template: './www/index.html',
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
