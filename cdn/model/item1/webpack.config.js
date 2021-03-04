const path = require('path');

module.exports = {
    entry: './src/index.js',

    module: {
        rules: [
            // es6 转 es5
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },

    output: {
        // 输出压缩文件
        path: path.resolve(__dirname, './src'),
        filename: 'index.min.js',
    },
};
