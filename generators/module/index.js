'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs');

function getModules(baseUrl) {
  const modules = [];
  const index = baseUrl.lastIndexOf('/modules') + 8;
  for (let dir of fs.readdirSync(baseUrl)) {
    const stat = fs.statSync(`${baseUrl}/${dir}`);
    if (stat.isDirectory()) {
      modules.push.apply(modules, getModules(`${baseUrl}/${dir}`));
    } else if (dir === 'index.js') {
      modules.push({ path: `${baseUrl.substr(index)}` });
    }
  }
  return modules;
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the ultimate ' + chalk.red('generator-react-native-starter') + ' generator!'));

    let baseUrl = this.destinationRoot();
    // Const modules = getModules(modulesPath).map(dir => ({
    //   name: dir.path === '' ? './' : `.${dir.path}`,
    //   value: dir.path,
    //   checked: dir.path === ''
    // }));

    const baseProps = {};
    const prompts = [];
    if (!baseUrl.includes('/src') && !fs.existsSync(baseUrl + '/src')) {
      throw new Error('未检查到 React-Native-Starter 项目');
    }
    if (baseUrl.endsWith('/modules')) {
      baseProps.baseUrl = baseUrl;
    } else if (baseUrl.endsWith('/src')) {
      // 确定 modules 目录
      baseProps.baseUrl = baseUrl + '/modules';
      if (!fs.existsSync(baseUrl + '/modules')) {
        // 新建 /modules 目录
        fs.mkdir(baseUrl + '/modules');
      }
    } else if (baseUrl.includes('/modules')) {
      baseProps.baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/modules') + 8);
      baseProps.name = baseUrl.substr(baseUrl.lastIndexOf('/modules') + 9);
    } else if (baseUrl.includes('/src')) {
      // 定位到 src 目录
      baseProps.baseUrl = baseUrl.substr(0, baseUrl.lastIndexOf('/src') + 4) + '/modules';
    } else {
      baseProps.baseUrl = baseUrl + '/src/modules';
    }
    // 确定模块名称
    if (!baseProps.name) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: '输入模块名称',
        validate: function(input) {
          var done = this.async();
          if (!input) {
            done('模块名称必填');
            return;
          }
          done(null, true);
        }
      });
    }
    return this.prompt(prompts).then(props => {
      this.props = { ...baseProps, ...props };
    });
  }

  writing() {
    const { baseUrl, name } = this.props;
    this.fs.copy(this.sourceRoot(), baseUrl + '/' + name);
  }
};
