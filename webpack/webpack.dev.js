const path = require('path');
const config = require('./webpack.config');

module.exports = Object.assign(config, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 9000,
    }
});
