module.exports = {
    // Use "node" test environment so we can simulate server (Lambda) behavior.
    testEnvironment: 'node',

    // Tell Jest which patterns to look for when discovering test files.
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],

    // Use ts-jest to transform TypeScript files so Jest can execute them.
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
};