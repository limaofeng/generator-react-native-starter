'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('projectName', {
      type: String,
      desc: '项目名称',
      required: false
    });
  }
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: '输入项目名称',
        default: this.options.projectName,
        when: this.options.projectName === null || this.options.projectName === undefined
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = Object.assign(
        {
          projectName: this.options.projectName
        },
        props
      );
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('Podfile'), this.destinationPath('ios/Podfile'), {
      props: this.props
    });
    this.fs.copyTpl(
      this.templatePath('vpser'),
      this.destinationPath(`ios/${this.props.projectName}`),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('vpser.xcodeproj'),
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
      this.templatePath('vpser.xcworkspace'),
      this.destinationPath(`ios/${this.props.projectName}.xcworkspace`),
      { props: this.props }
    );
    this.fs.copyTpl(
      this.templatePath('vpserUITests'),
      this.destinationPath(`ios/${this.props.projectName}UITests`),
      { props: this.props }
    );
    this.fs.move(
      this.destinationPath(`ios/${this.props.projectName}UITests/vpserUITests.swift`),
      this.destinationPath(
        `ios/${this.props.projectName}UITests/${this.props.projectName}UITests.swift`
      )
    );
  }

  install() {
    this.spawnCommand('pod', ['install', '--project-directory=ios']);
  }
};
