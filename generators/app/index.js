'use strict';
const Generator = require('yeoman-generator');
const lodash = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this._props = {};
    this._blocks = {};
    this._dependencies = {};
    this._devDependencies = {};
    this.afterInstall = new Promise(resolve => {
      this._resolveAfterInstall = () => resolve();
    });
  }

  get dependencies() {
    return this._dependencies;
  }

  get devDependencies() {
    return this._devDependencies;
  }

  set dependencies(dependencies) {
    this._dependencies = { ...this._dependencies, ...dependencies };
  }

  set devDependencies(devDependencies) {
    this._devDependencies = { ...this._devDependencies, ...devDependencies };
  }

  get props() {
    return this._props;
  }

  set props(props) {
    lodash.merge(this._props, props);
  }

  blocks(file, key, value) {
    if (key) {
      this._blocks[file] = this._blocks[file] || {};
      this._blocks[file][key] = value;
    }
    return key => {
      return this._blocks[file] && this._blocks[file][key];
    };
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the groovy ' + chalk.red('generator-react-native-starter') + ' generator!'));

    const prompts = [
      // {
      //   name: 'projectAssets',
      //   type: 'list',
      //   message: '请选择模板:',
      //   choices: [
      //     {
      //       name: 'React',
      //       value: 'web',
      //       checked: true
      //     },
      //     {
      //       name: 'React-Native',
      //       value: 'native'
      //     }
      //   ]
      // },
      {
        type: 'input',
        name: 'project.name',
        message: '输入项目名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'project.displayName',
        message: '项目显示名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'author.name',
        message: '开发者',
        default: '李茂峰'
      },
      {
        type: 'input',
        name: 'author.email',
        message: '开发者邮箱',
        default: 'limaofeng@msn.com'
      },
      {
        type: 'input',
        name: 'author.url',
        message: '开发者网站',
        default: 'https://homeworld.life'
      },
      {
        type: 'input',
        name: 'project.version',
        message: '项目版本号',
        default: '0.0.1'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    // Plugins
    this.composeWith(require.resolve('../plugins'), { base: this });

    // IOS
    this.composeWith(require.resolve('../ios'), { base: this });

    // Fastlane
    this.composeWith(require.resolve('../fastlane'), { base: this });

    // Example
    this.composeWith(require.resolve('../example'), { base: this });

    // Git
    this.composeWith(require.resolve('../git'), { base: this });
  }

  writing() {
    // Package
    this.fs.copy(this.templatePath('package.json'), this.destinationPath('package.json'));
    this.fs.extendJSON(this.destinationPath('package.json'), {
      name: this.props.project.name,
      version: this.props.project.version,
      author: this.props.author
    });

    // Config
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
    this.fs.copyTpl(this.templatePath('config/jest/setupTests.js'), this.destinationPath('config/jest/setupTests.js'), {
      block: this.blocks('config/jest/setupTests.js')
    });

    // Source
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    // WallabyJS
    this.fs.copy(this.templatePath('wallaby.js'), this.destinationPath('wallaby.js'));

    // APP Info
    this.fs.copyTpl(this.templatePath('app.json'), this.destinationPath('app.json'), {
      project: this.props.project
    });

    // Index.js
    this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath('index.js'), {
      project: this.props.project
    });

    // Utils
    this.fs.copyTpl(this.templatePath('src/utils/index.js'), this.destinationPath('src/utils/index.js'), {
      block: this.blocks('src/utils/index.js')
    });

    // App.js
    this.fs.copyTpl(this.templatePath('src/App.js'), this.destinationPath('src/App.js'), {
      block: this.blocks('src/App.js'),
      project: this.props.project
    });

    // License
    this.composeWith(require.resolve('generator-license'), {
      ...this.props.author,
      website: this.props.author.url,
      license: 'MIT'
    });
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    }).then(() => {
      this._resolveAfterInstall();
    });
  }
};
