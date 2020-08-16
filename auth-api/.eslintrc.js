module.exports = {
    parser: "@babel/eslint-parser",
    extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
       ecmaVersion: 6,

        ecmaFeatures: {
            globalReturn: false,
        },
        babelOptions: {
           // configFile: "path/to/config.js",
        },
    },
};
