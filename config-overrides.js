const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', { // 配置上 babel-plugin-import
        libraryName: 'antd', // 针对的是 antd
        libraryDirectory: 'es', // 源码文件夹中的 es 文件夹
        style: true // 自动打包相关的 css
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1da57a'}
    }),
);