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
        default: this.options.values().appIdentifier,
        when: this.options.values().appIdentifier === null || this.options.values().appIdentifier === undefined
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
    this.fs.copyTpl(this.sourceRoot(), this.destinationPath('fastlane'), {
      projectName: props.projectName,
      appIdentifier: props.appIdentifier,
      appleId: 'limaofeng@msn.com',
      teamId: 'VLH995V894',
      gitUrl: 'git@gitlab.com:homeworld.life/certificates.git',
      slackUrl: 'https://hooks.slack.com/services/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'
    });
    this.fs.copy(this.templatePath('../screenshots'), this.destinationPath('fastlane/screenshots'));
  }
};
