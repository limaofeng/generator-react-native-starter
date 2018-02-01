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
    this.fs.copyTpl(this.sourceRoot(), this.destinationPath('fastlane'), {
      projectName: this.props.projectName,
      appIdentifier: `life.homeworld.app.${this.props.projectName}`,
      appleId: 'limaofeng@msn.com'
    });
    this.fs.copy(
      this.templatePath('../screenshots'),
      this.destinationPath('fastlane/screenshots')
    );
  }
};
