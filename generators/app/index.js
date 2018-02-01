'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
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
        name: 'authorName',
        message: '开发者',
        default: '李茂峰'
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: '开发者邮箱',
        default: 'limaofeng@msn.com'
      },
      {
        type: 'input',
        name: 'authorUrl',
        message: '开发者网站',
        default: 'https://homeworld.life'
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
    const values = props => {
      if (!props) {
        return this.props;
      }
      this.props = { ...this.props, ...props };
      return this.props;
    };

    // Source
    this.composeWith(require.resolve('../react-native'), {
      projectName: this.props.projectName,
      values
    });

    // IOS
    this.composeWith(require.resolve('../ios'), {
      projectName: this.props.projectName,
      values
    });

    // Fastlane
    this.composeWith(require.resolve('../fastlane'), {
      projectName: this.props.projectName,
      values
    });

    // Gitignore
    this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    // APP Info
    this.fs.copyTpl(this.templatePath('app.json'), this.destinationPath('app.json'), {
      props: this.props
    });

    // Index.js
    this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath('index.js'), {
      props: this.props
    });

    // License
    this.composeWith(require.resolve('generator-license'), {
      name: this.props.authorName,
      email: this.props.authorEmail,
      website: this.props.authorUrl,
      license: 'MIT'
    });
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    }).then(() => {
      if (!this.fs.exists(this.destinationPath('ios/Podfile'))) {
        return;
      }
      if (this.fs.exists(this.destinationPath('ios/Pods/Manifest.lock'))) {
        this.spawnCommand('pod', ['update', '--project-directory=ios', '--no-repo-update']);
      } else {
        this.spawnCommand('pod', ['install', '--project-directory=ios']);
      }
    });
  }

  end() {
    this.spawnCommandSync('git', ['init']);
    this.repo = `git@github.com:limaofeng/${this.props.projectName}.git`;
    this.spawnCommandSync('git', ['remote', 'add', 'origin', this.repo]);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"']);
  }
};
