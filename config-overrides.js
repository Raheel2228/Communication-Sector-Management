const { override, fixBabelImports, disableEsLint, addLessLoader } = require('customize-cra');
const path = require('path');

module.exports = override(
  // don't want linting while compiling
  disableEsLint(),

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      'primary-color': '#5343B2',
      'text-color': '#92A3AC',
      'border-radius-base': '3px',
    },
  }),
);
