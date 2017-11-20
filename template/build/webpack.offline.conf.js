/**
  * -------------------------------
  * @file        webpack.offline.conf.js
  * @description 离线包功能webpack配置
  * @date        2017-10-25
  * -------------------------------
  */
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const Client = require('ftp')
const ora = require('ora')
const request = require('request')
const getUserName = require('git-user-name')
// 打zip插件
const AkWebpackPlugin = require('ak-webpack-plugin');
var pkg = require('../package.json')
// 离线包配置
const offlineCfg = require('../config/offline')
const isProduction = process.env.NODE_ENV === 'production'
const curCfg = isProduction ? offlineCfg.build : offlineCfg.dev

// 离线包地址
const offlinePath = []

let date = new Date()
let stamp = date.getTime()
// console.log(path.join(offlineCfg.src, '*.{htm, html}'))

// 计算离线包的版本号
const offlineVersion = () => {
  let year = date.getFullYear()       //年
  let month = date.getMonth() + 1     //月
  let day = date.getDate()            //日
  let hh = date.getHours()            //时
  let mm = date.getMinutes()          //分
  let ss = date.getSeconds()           //秒
  let clock = year;
  if (month < 10) clock += "0"
  clock += '' + month
  if (day < 10) clock += "0"
  clock += '' + day
  if (hh < 10) clock += "0";
  clock += '' + hh
  if (mm < 10) clock += '0';
  clock += '' + mm
  if (ss < 10) clock += '0';
  clock += '' + ss
  return clock;
}

// 生成离线包版本号
const version = offlineVersion()
// const version = '20170901170838'
const zipName = version + '.base'
const filename = path.join(offlineCfg.src, zipName)

// 上传zip包
var spinner = ora('开始向生产环境上传离线包' + zipName + '.zip...\n')
function upload() {
  spinner.start()
  var c = new Client();
  return new Promise(function (resolve, reject) {
    // 链接ftp
      c.connect({
        host: curCfg.ftp.host,
        port: 21,
        user: curCfg.ftp.user,
        password: curCfg.ftp.password,
        connTimeout: 15000,
        secure: false
      });
      // ftp链接成功
      c.on('ready', function (err) {
        if (err) reject(err)
        let ftpfile = path.join(curCfg.ftp.base, offlineCfg.name, zipName + '.zip')
        // 设置二进制传输方式
        c.binary(function (err) {
          if (err) reject(err)
          //创建目录
          c.mkdir(path.join(curCfg.ftp.base, offlineCfg.name), true, function (err) {
            if (err) reject(err)
            c.put(filename + '.zip', ftpfile, function (err) {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          })
        })
      })
    })
  .then(() => {
    spinner.succeed(zipName + '.zip 离线包上传到生产环境成功！')
    request.post(
      {
        url: curCfg.server+'/addnewzip',
        form: {
          name: pkg.name, // 离线包归属目录，与package.json的name保持一致
          description: pkg.description, // 项目描述
          date: stamp,
          ver: version,
          // base: zipName,
          publisher: getUserName(),
          offlinePath
          // offlinePath:['m.zhuanzhuan.58.com/Mzhuanzhuan/zzapp/detail/','j2.58cdn.com.cn/zhuanzhuan/zzapp/detail/']
        }
      },
      function (err, response, body) {
        if (err) {
          console.log(err)
        }
        if (response) {
          console.log('提交离线包返回信息为：');
          console.log(body);
          console.log('提交离线包信息成功！请在生产环境下验证该前端工程的离线包表现！')
        }
      })
    c.end()
  }).catch(err => {
    console.log(err)
  })
}

// 生成需要zip包映射
let map = []
offlineCfg.map.forEach(v => {
  offlinePath.push(v.cdn)
  let domains = {
    "src": v.isWebserver ? 'webserver' : v.src,
    // String, 目标文件路径子文件夹，默认为空字符串
    // "isSameOrigin": true,
    // Boolean， 默认 false，如果为 true， 则会将 cdn 的 url替换成与 isWebserver 为 true 的 cdn url
    "url": v.cdn,
    "exclude": ((cfg) => {
      let files = cfg.include.map(v => cfg.dest + '/' + v + '.*')
      files.push(cfg.dest)
      if (cfg.include.length) {
        if (cfg.dest != 'js' && cfg.dest != 'css') {
          return ['!' + path.join(filename, cfg.cdn, '{' + files.join(',') + '}')]
        } else {
          return ['!' + path.join(filename, cfg.cdn, '{' + files.join(',') + '}'), path.join(filename, cfg.cdn, cfg.dest, '*.map')]
        }
      } else {
        if (cfg.dest == 'js' || cfg.dest == 'css') {
          return [path.join(filename, cfg.cdn, cfg.dest, '*.map')]
        }
      }
    })(v)
  }
  if(v.isWebserver) {
    domains.isWebserver = true
  } else {
    domains.dest = v.dest
  }
  map.push(domains)
})

// console.log(map)
var webpackConfig = {
  plugins: [
    new AkWebpackPlugin({
      "zipFileName": filename,
      "src": offlineCfg.src,
      "keepOffline": true,
      "zipConfig": {
        zlib: { level: 8 },
      },
      "map": map,
      afterZip: () => {
        // 打包完成后上传离线包
        setTimeout(upload,2000);
      }
    })
  ]
}
module.exports = offlineCfg.offline ? webpackConfig : {}
