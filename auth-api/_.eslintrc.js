/*
module["export"]= {
    env: {
        jest: true,
    },
    extends: 'airbnb-base',
    rules: {
        'comma-dangle': 0,
        'no-underscore-dangle': 0,
        'no-param-reassign': 0,
        'no-return-assign': 0,
        camelcase: 0,
    },
    parser: "babel-eslint"


};
*/

module['export'] = {
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'allowImportExportEverywhere': false,
    'codeFrame': true
  }
};
