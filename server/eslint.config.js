import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
    {
        // Skip linting for built files, dependencies, and test coverage reports
        ignores: ["node_modules/", "dist/", "coverage/"],
    },
    {
        languageOptions: {
            ecmaVersion: "latest",  // Use the latest ECMAScript features
            sourceType: "module",   // Treat files as ES modules
        },
        plugins: {
            react: eslintPluginReact,         // Add React-specific linting rules
            "react-hooks": eslintPluginReactHooks,  // Add React Hooks linting rules
        },
        rules: {
            "react-hooks/exhaustive-deps": "warn",  // Warn about missing dependencies in React Hooks
            "react-hooks/rules-of-hooks": "error",  // Enforce Rules of Hooks strictly
            "no-console": "off",                    // Allow console.log statements
        },
    },
];