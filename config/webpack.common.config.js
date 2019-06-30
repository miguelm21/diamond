const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: {      
    
      index: './src/index.js',
      panelEmpresas: './src/pages/panelEmpresas/panelEmpresas.js',
      panelRestaurante: './src/pages/panelRestaurante/panelRestaurante.js',
      panelRestaurante2: './src/pages/panelRestaurante2/panelRestaurante2.js',
      panelClientes: './src/pages/panelClientes/panelClientes.js',
      loginEmpresas: './src/pages/loginEmpresas/loginEmpresas.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
        {
            test: [/.js$|.ts$/],
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/typescript'
                    ]
                }
            }
        },
        {
            test: [/.css$|.scss$/],
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
           ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images'
                    }
                }
            ]
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index'],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/pages/panelEmpresas/panelEmpresas.html',
        filename: 'panelEmpresas.html',
        chunks: ['panelEmpresas'],
        inject: 'body',
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/pages/panelRestaurante/panelRestaurante.html',
        filename: 'panelRestaurante.html',
        chunks: ['panelRestaurante'],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/pages/panelRestaurante2/panelRestaurante2.html',
        filename: 'panelRestaurante2.html',
        chunks: ['panelRestaurante2'],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/pages/panelClientes/panelClientes.html',
        filename: 'panelClientes.html',
        chunks: ['panelClientes'],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new HtmlWebpackPlugin({
        title: 'EmetLife',
        template: './src/pages/loginEmpresas/loginEmpresas.html',
        filename: 'loginEmpresas.html',
        chunks: ['loginEmpresas'],
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: false
        }
    }),
    new MiniCssExtractPlugin({
        filename: 'style.[chunkhash].css'
    }),
    new CopyWebpackPlugin([{
        from:'./src/assets/image',
        to:'assets/images'
        
    }]),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
/*     new FaviconsWebpackPlugin({
        logo: './src/assets/images/favicon.png',
        persistentCache: true,
        inject: true,
    }), */
    new ImageminPlugin({ test: 'images/**' })
  ],
  externals: {
    moment: 'moment'
  }
};