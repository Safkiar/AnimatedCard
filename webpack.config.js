const path = require('path');
const webpack = require('webpack');
const PugPlugin = require('pug-plugin');

const isDevel = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    output: {
        path: `${__dirname}/dist`,
        clean: true,
    },

    devtool: isDevel ? 'inline-source-map' : false,

    performance: {
        hints: false,
    },

    resolve: {
        alias: {
            // (best practice) webpack aliases can be used in HTML, SCSS, JS to avoid relative paths like `../../images/`
            '@images': path.join(__dirname, 'src/images'),
            '@fonts': path.join(__dirname, 'src/fonts'),
            '@scripts': path.join(__dirname, 'src/js'),
            '@styles': path.join(__dirname, 'src/scss'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.scss$/,
                use: [ 'css-loader',  'sass-loader'],
            },
            {
                test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
            },
        ],
    },

    plugins: [
        new PugPlugin({
            entry: {
                index: 'src/views/index.pug',
            },
            js: {
                filename: 'js/[name].[contenthash:8].js', // JS output filename
            },
            css: {
                filename: 'css/[name].[contenthash:8].css', // CSS output filename
            },
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],

    // enable live reload
    devServer: {
        static: path.join(__dirname, 'dist'),
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true,
            },
        },
        hot: true,
        open: true,
    },
};