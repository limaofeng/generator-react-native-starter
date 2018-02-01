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
      },
      {
        type: 'input',
        name: 'appIdentifier',
        message: 'iOS App ID',
        default: `life.homeworld.app.${this.options.projectName || this.appname}`
      }
    ];

    return this.prompt(prompts).then(props => {
      this.options.values(
        Object.assign(
          {
            ...this.options.values()
          },
          props
        )
      );
    });
  }

  writing() {
    const props = this.options.values();
    this.fs.copyTpl(this.templatePath('Podfile'), this.destinationPath('ios/Podfile'), {
      props
    });
    this.fs.copyTpl(
      this.templatePath('vpser'),
      this.destinationPath(`ios/${props.projectName}`),
      { props }
    );
    this.fs.copyTpl(
      this.templatePath('vpser.xcodeproj'),
      this.destinationPath(`ios/${props.projectName}.xcodeproj`),
      { props }
    );
    this.fs.move(
      this.destinationPath(
        `ios/${props.projectName}.xcodeproj/xcshareddata/xcschemes/vpser.xcscheme`
      ),
      this.destinationPath(
        `ios/${props.projectName}.xcodeproj/xcshareddata/xcschemes/${
          props.projectName
        }.xcscheme`
      )
    );
    this.fs.copyTpl(
      this.templatePath('vpser.xcworkspace'),
      this.destinationPath(`ios/${props.projectName}.xcworkspace`),
      { props }
    );
    this.fs.copyTpl(
      this.templatePath('vpserUITests'),
      this.destinationPath(`ios/${props.projectName}UITests`),
      { props }
    );
    this.fs.move(
      this.destinationPath(`ios/${props.projectName}UITests/vpserUITests.swift`),
      this.destinationPath(
        `ios/${props.projectName}UITests/${props.projectName}UITests.swift`
      )
    );
  }
};
