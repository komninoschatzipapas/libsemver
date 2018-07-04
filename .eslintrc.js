module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
        "mocha": true,
    },
    "parser": "typescript-eslint-parser",
    "parserOptions": {
        "sourceType": 'module',
        "ecmaFeatures": {
            "modules": true
        }
    },
    "extends": ["eslint-config-google"],
    "rules": {
        "no-trailing-spaces": "error",
        "require-jsdoc": "off",
        "no-unused-vars": "off"
    }
}
