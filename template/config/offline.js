/**
 * -------------------------------
 * @file        offline.js
 * @description 离线包功能配置项
 * @date        2017-09-01
 * -------------------------------
 */
var path = require('path')
var config = require('./index').build

module.exports = {
  offline: true, // 是否开启离线包功能，默认true
  src: config.assetsRoot, // 当前项目打包生成的前端目录，例如 dist，与webpack配置保持一致
  assets: config.assetsSubDirectory, // 当前项目打包生成的静态资源目录，例如 static，与webpack配置保持一致
  map: [{
    src: config.assetsSubDirectory + '/js',
    dest: 'js',
    cdn:config.assetsPublicPath.replace(/http[sS]\:\/\//, '')+'static/',  // js静态资源cdn地址
    include:[]// 指定需要打包的js文件名，默认打包全部
  },{
    src: config.assetsSubDirectory + '/css',
    dest: 'css',
    cdn:config.assetsPublicPath.replace(/http[sS]\:\/\//, '')+'static/', // css静态资源cdn地址
    include:[] // 指定需要打包的css文件，默认打包全部
  },{
    src: config.assetsSubDirectory + '/img',
    dest: 'img',
    cdn:config.assetsPublicPath.replace(/http[sS]\:\/\//, '')+'static/', // img静态资源cdn地址
    include:['banner', 'down', 'love-off', 'like-on', 'like-off'] // 指定需要打包的图片，默认不打包
  },
  {
    isWebserver:true,
    cdn:'m.zhuanzhuan.58.com/Mzhuanzhuan/ZZAppSupport',
    include:[]
  }],
  dev:{
   
  },
  build:{
    
  }
}
