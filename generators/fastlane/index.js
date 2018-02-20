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
      // {
      //   type: 'input',
      //   name: 'ios.appIdentifier',
      //   message: 'iOS App ID',
      //   default: this.props.appIdentifier,
      //   when: this.props.appIdentifier === null || this.props.appIdentifier === undefined
      // }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props = {
        ios: {
          ...props.ios,
          appleId: 'limaofeng@msn.com',
          teamId: 'VLH995V894',
          certificates: { gitUrl: 'git@gitlab.com:homeworld.life/certificates.git' }
        },
        ci: {
          slackUrl: 'https://hooks.slack.com/services/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'
        }
      };
    });
  }

  writing() {
    this.fs.copyTpl(this.sourceRoot(), this.destinationPath('fastlane'), {
      project: this.props.project,
      ios: this.props.ios,
      ci: this.props.ci
    });
    this.fs.copy(this.templatePath('../screenshots'), this.destinationPath('fastlane/screenshots'));
  }
};
