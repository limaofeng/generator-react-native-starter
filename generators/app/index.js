'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the groovy ' +
          chalk.red('generator-react-native-starter') +
          ' generator!'
      )
    );

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
        name: 'projectName',
        message: '输入项目名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'projectDisplayName',
        message: '项目显示名称',
        default: this.appname
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: '开发者',
        default: 'limaofeng'
      },
      {
        type: 'input',
        name: 'projectAuthorEmail',
        message: '开发者邮箱',
        default: 'limaofeng@msn.com'
      },
      {
        type: 'input',
        name: 'projectVersion',
        message: '项目版本号',
        default: '0.0.1'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('android'), this.destinationPath('android'));
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
    this.fs.copy(this.templatePath('fastlane'), this.destinationPath('fastlane'));
    // IOS
    this.fs.copyTpl(
      this.templatePath('ios/Podfile'),
      this.destinationPath('ios/Podfile'),
      { props: this.props }
    );
    this.fs.copy(
      this.templatePath('ios/vpser'),
      this.destinationPath(`ios/${this.props.projectName}`)
    );
    this.fs.copyTpl(
      this.templatePath('ios/vpser.xcodeproj'),
      this.destinationPath(`ios/${this.props.projectName}.xcodeproj`),
      { props: this.props }
    );
    this.fs.move(
      this.destinationPath(
        `ios/${this.props.projectName}.xcodeproj/xcshareddata/xcschemes/vpser.xcscheme`
      ),
      this.destinationPath(
        `ios/${this.props.projectName}.xcodeproj/xcshareddata/xcschemes/${
          this.props.projectName
        }.xcscheme`
      )
    );
    this.fs.copyTpl(
      this.templatePath('ios/vpser.xcworkspace'),
      this.destinationPath(`ios/${this.props.projectName}.xcworkspace`),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('ios/vpserUITests'),
      this.destinationPath(`ios/${this.props.projectName}UITests`),
      { props: this.props }
    );
    this.fs.move(
      this.destinationPath(`ios/${this.props.projectName}UITests/vpserUITests.swift`),
      this.destinationPath(
        `ios/${this.props.projectName}UITests/${this.props.projectName}UITests.swift`
      )
    );
    // Source
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    // Gitignore
    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    // APP Info
    this.fs.copyTpl(this.templatePath('app.json'), this.destinationPath('app.json'), {
      props: this.props
    });
    // Index.js
    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
    // WallabyJS
    this.fs.copy(this.templatePath('wallaby.js'), this.destinationPath('wallaby.js'));
    // Package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { props: this.props }
    );
  }

  install() {
    /*
    This.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
    this.yarnInstall(['lodash'], { saveDev: true });
    */
  }
};
