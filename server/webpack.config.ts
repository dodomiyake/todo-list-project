const path = require('path');

module.exports = {
    entry: './src/handlers/todos.ts',
    target: 'node',
    mode: 'production',
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [
                    [
                        path.resolve(__dirname, '.webpack'),
                        path.resolve(__dirname, 'node_modules')
                    ]
                ]
            }
        ]
    }
};
