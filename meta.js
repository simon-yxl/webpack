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
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
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
      "message": "Install vue-router?"
    },
    "vuex": {
      "type": "confirm",
      "message": "Install vuex?"
    },
    "offline": {
      "type": "confirm",
      "message": "Do you use offline package ?"
    },
    "babel-polyfill": {
      "type": "confirm",
      "message": "Do you use babel-polyfill?"
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
    "build/webpack.offline.conf.js": "offline"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
