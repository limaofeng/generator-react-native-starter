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
        name: 'repo',
        message: 'Git Repository Url',
        default: `git@github.com:limaofeng/${this.props.project.name}.git`
      }
    ];
    return this.prompt({
      type: 'confirm',
      name: 'repository',
      message: '是否初始化Git库?',
      default: true
    })
      .then(props => {
        if (!props.repository) {
          return props;
        }
        return this.prompt(prompts).then(props => ({
          repository: {
            type: 'git',
            url: props.repo
          }
        }));
      })
      .then(props => {
        this.props = props;
      });
  }

  writing() {
    if (!this.props.repository) {
      return;
    }
    this.fs.copy(this.templatePath('.gitattributes'), this.destinationPath('.gitattributes'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    // Add repository to package.json
    this.fs.extendJSON(this.destinationPath('package.json'), {
      repository: this.props.repository
    });
  }

  end() {
    if (!this.props.repository || this.fs.exists(this.destinationPath('.git/config'))) {
      return;
    }
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['remote', 'add', 'origin', this.props.repo]);
    this.spawnCommandSync('git', ['add', '--all']);
    this.spawnCommandSync('git', ['commit', '-m', '"initial commit from generator"']);
  }
};
