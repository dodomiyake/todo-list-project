import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
    {
        ignores: ["node_modules/", "dist/", "coverage/",], // Ignore unnecessary folders
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            react: eslintPluginReact,
            "react-hooks": eslintPluginReactHooks,
        },
        rules: {
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "error",
            "no-console": "off",
        },
    },
];
