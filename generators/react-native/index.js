'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const props = this.options.values();

    // Config
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));

    // Source
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    // WallabyJS
    this.fs.copy(this.templatePath('wallaby.js'), this.destinationPath('wallaby.js'));

    // Package
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { props }
    );
  }
};
