'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.base = opts.base;
  }
  get props() {
    return (this.base && this.base.props) || {};
  }

  set props(props) {
    this.base.props = props;
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'ios.appIdentifier',
        message: 'iOS App ID',
        default: `life.homeworld.app.${this.props.project.name || this.appname}`
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const { project } = this.props;
    this.fs.copyTpl(this.templatePath('Podfile'), this.destinationPath('ios/Podfile'), {
      project
    });
    this.fs.copyTpl(this.templatePath('vpser'), this.destinationPath(`ios/${project.name}`), { project });
    this.fs.copyTpl(this.templatePath('vpser.xcodeproj'), this.destinationPath(`ios/${project.name}.xcodeproj`), {
      project,
      ios: this.props.ios
    });
    this.fs.move(
      this.destinationPath(`ios/${project.name}.xcodeproj/xcshareddata/xcschemes/vpser.xcscheme`),
      this.destinationPath(`ios/${project.name}.xcodeproj/xcshareddata/xcschemes/${project.name}.xcscheme`)
    );
    this.fs.copyTpl(this.templatePath('vpser.xcworkspace'), this.destinationPath(`ios/${project.name}.xcworkspace`), {
      project
    });
    this.fs.copyTpl(this.templatePath('vpserUITests'), this.destinationPath(`ios/${project.name}UITests`), {
      project
    });
    this.fs.move(
      this.destinationPath(`ios/${project.name}UITests/vpserUITests.swift`),
      this.destinationPath(`ios/${project.name}UITests/${project.name}UITests.swift`)
    );
  }
  install() {
    this.base.afterInstall.then(() => {
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
};
