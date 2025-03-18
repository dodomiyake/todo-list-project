const path = require('path');

module.exports = {
    // Specify the entry point of your application
    entry: './src/handlers/todos.ts',

    // Target Node.js environment (not browser)
    target: 'node',

    // Use production mode for optimizations
    mode: 'production',

    // Configure how modules are resolved
    resolve: {
        extensions: ['.ts', '.js']  // Look for these file extensions
    },

    // Configure output bundle
    output: {
        libraryTarget: 'commonjs2',  // Use CommonJS module system for Lambda compatibility
        path: path.join(__dirname, '.webpack'),  // Output directory
        filename: 'todo.js'  // Output filename
    },

    // Define rules for processing different file types
    module: {
        rules: [
            {
                test: /\.ts$/,  // Process TypeScript files
                loader: 'ts-loader',  // Use TypeScript loader for compilation
                exclude: [
                    [
                        path.resolve(__dirname, '.webpack'),  // Don't process files in output directory
                        path.resolve(__dirname, 'node_modules')  // Don't process node_modules
                    ]
                ]
            }
        ]
    }
};