'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.base = opts.base;
    this.dependencies = {};
    this.devDependencies = {};
  }

  prompting() {
    const prompts = [
      {
        name: 'plugins',
        type: 'checkbox',
        message: '选择需要安装的插件',
        choices: [
          {
            name: 'react-navigation',
            value: 'react-navigation',
            checked: true
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      for (let pluginName of props.plugins) {
        const plugin = this.fs.readJSON(this.templatePath(`${pluginName}/package.json`));
        this.dependencies = { ...this.dependencies, ...plugin.dependencies };
        this.devDependencies = { ...this.devDependencies, ...plugin.devDependencies };
      }
    });
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      dependencies: this.dependencies,
      devDependencies: this.devDependencies
    });
  }

  install() {}
};
