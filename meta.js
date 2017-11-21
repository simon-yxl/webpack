module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    "hump": function (v, options) {
      return v.replace(/\-(\w)/g, function(all, letter){
       return letter.toUpperCase();
      }).replace(/^(\w)/g, function(m){
        return m.toUpperCase()
      })
    },
    "str": function (v, options) {
      return v || '值不存在'
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "填写项目名称"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "填写项目描述",
      "default": "转转前端vue项目"
    },
    "author": {
      "type": "string",
      "message": "作者"
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "router": {
      "type": "confirm",
      "message": "是否使用vue-router?"
    },
    "vuex": {
      "type": "confirm",
      "message": "是否使用vuex?"
    },
    "offline": {
      "type": "confirm",
      "message": "是否使用离线包功能？"
    },
    "babel-polyfill": {
      "type": "confirm",
      "message": "是否安装babel-polyfill插件？"
    },
    "jenkins": {
      "type": "confirm",
      "message": "是否配置jenkins？"
    },
    "jenkins_test_cnd_address":{
      "when": "jenkins",
      "type": "list",
      "message": "配置jenkins上静态资源存放的服务器地址",
      "choices": [{
        "name": "192.168.187.2",
        "value": "192.168.187.2",
        "short": "192.168.187.2"
      }, {
        "name": "192.168.187.16",
        "value": "192.168.187.16",
        "short": "192.168.187.16"
      }, {
        "name": "192.168.187.21",
        "value": "192.168.187.21",
        "short": "192.168.187.21"
      }]
    },
    "jenkins_test_cnd_path":{
      "when": "jenkins_test_cnd_address",
      "type": "input",
      "message": "填写测试环境cdn路径"
    },
    "jenkins_test_html_address":{
      "when": "jenkins_test_cnd_path",
      "type": "list",
      "message": "配置jenkins上html文件存放的测试服务器地址",
      "choices": [{
        "name": "192.168.187.2",
        "value": "192.168.187.2",
        "short": "192.168.187.2"
      }, {
        "name": "192.168.187.16",
        "value": "192.168.187.16",
        "short": "192.168.187.16"
      }, {
        "name": "192.168.187.21",
        "value": "192.168.187.21",
        "short": "192.168.187.21"
      }]
    },
    "jenkins_test_html_path":{
      "when": "jenkins_test_html_address",
      "type": "input",
      "message": "填写测试环境html文件存放路径"
    },
    "jenkins_online_cdn_address":{
      "when": "jenkins_test_html_path",
      "type": "list",
      "message": "配置jenkins上静态文件文件存放的线上服务器地址",
      "choices": [{
        "name": "img.58cdn.com.cn",
        "value": "img.58cdn.com.cn",
        "short": "img.58cdn.com.cn"
      }, {
        "name": "j1.58cdn.com.cn",
        "value": "j1.58cdn.com.cn",
        "short": "j1.58cdn.com.cn"
      }, {
        "name": "j2.58cdn.com.cn",
        "value": "j2.58cdn.com.cn",
        "short": "j2.58cdn.com.cn"
      }, {
        "name": "c.58cdn.com.cn",
        "value": "c.58cdn.com.cn",
        "short": "c.58cdn.com.cn"
      }]
    },
    "jenkins_online_cdn_path":{
      "when": "jenkins_online_cdn_address",
      "type": "input",
      "message": "填写线上环境cdn路径"
    },
    "jenkins_online_html_address":{
      "when": "jenkins_online_cdn_path",
      "type": "list",
      "message": "配置jenkins上html文件存放的线上环境地址",
      "choices": [{
        "name": "m.zhuanzhuan.58.com",
        "value": "m.zhuanzhuan.58.com",
        "short": "m.zhuanzhuan.58.com"
      }, {
        "name": "m.zhuanzhuan.com",
        "value": "m.zhuanzhuan.com",
        "short": "m.zhuanzhuan.com"
      }, {
        "name": "m2.zhuanzhuan.com",
        "value": "m2.zhuanzhuan.com",
        "short": "m2.zhuanzhuan.com"
      }]
    },
    "jenkins_online_html_path":{
      "when": "jenkins_online_html_address",
      "type": "input",
      "message": "填写测试环境html文件存放线上环境路径"
    },
    "jenkins_npm_pkg":{
      "when": "jenkins_online_html_path",
      "type": "confirm",
      "message": "如果使用其他转转内部sdk，需要在jenkins中配置（例如：@zz-vc/zui-swipe），是否需要配置？"
    },
    "jenkins_npm_pkg_list":{
      "when": "jenkins_npm_pkg",
      "type": "checkbox",
      "message": "选择需要配置的 sdk",
      "choices": ["@zz-vc/zui-swipe", "@zz/api-cache", "@zz-vc/callApp", "@zz-vc/callApp"]
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests"
    },
    "runner": {
      "when": "unit",
      "type": "list",
      "message": "Pick a test runner",
      "choices": [
        {
          "name": "Jest",
          "value": "jest",
          "short": "jest"
        },
        {
          "name": "Karma and Mocha",
          "value": "karma",
          "short": "karma"
        },
        {
          "name": "none (configure it yourself)",
          "value": "noTest",
          "short": "noTest"
        }
      ]
    },
    "e2e": {
      "type": "confirm",
      "message": "Setup e2e tests with Nightwatch?"
    }
  },
  "filters": {
    "config/test.env.js": "unit || e2e",
    "build/webpack.test.conf.js": "e2e || (unit && runner === 'karma')",
    "test/unit/**/*": "unit",
    "test/unit/index.js": "unit && runner === 'karma'",
    "test/unit/jest.conf.js": "unit && runner === 'jest'",
    "test/unit/karma.conf.js": "unit && runner === 'karma'",
    "test/unit/specs/index.js": "unit && runner === 'karma'",
    "test/unit/setup.js": "unit && runner === 'jest'",
    "test/e2e/**/*": "e2e",
    "src/router/**/*": "router",
    "src/vuex/**/*": "vuex",
    "config/offline.js": "offline",
    "build/webpack.offline.conf.js": "offline",
    "JENKINS_COMPLIER":"jenkins",
    "jenkins_ftp_publish_servers.json":"jenkins"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
