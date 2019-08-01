import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import fs from 'fs';

const entries = (() => {
    const obj = {};
    fs.readdirSync(path.resolve(__dirname, '../client/entries'))
        .filter((filename) => /\.js$/.test(filename))
        .forEach((filename) => {
            obj[filename.replace(/\.js$/, '')] = path.resolve(
                __dirname,
                '../client/entries',
                filename,
            );
        });
    return obj;
})();

export default {
    mode: 'development',
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../static'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            cacheGroups: {
                dll: {
                    test: /\/(react|react-dom)\//,
                    name: 'dll'
                }
            }
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        ...Object.keys(entries).map(
            (entryName) =>
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, '../templates/index.html'),
                    filename: `html/${entryName}.html`,
                    chunks: [entryName],
                }),
        ),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
            },
        ],
    },
};
