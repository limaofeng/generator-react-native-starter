'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    // Const prompts = [
    //   {
    //     type: 'confirm',
    //     name: 'someAnswer',
    //     message: 'Would you like to enable this option?',
    //     default: true
    //   }
    // ];
    // return this.prompt(prompts).then(props => {
    //   this.props = props;
    // });
  }

  writing() {
    // This.fs.copy(this.templatePath('./components'), this.destinationPath('src/components'));
    this.fs.copy(this.templatePath('./modules'), this.destinationPath('src/modules'));
    this.fs.copy(this.templatePath('./tests'), this.destinationPath('tests'));
  }
};
