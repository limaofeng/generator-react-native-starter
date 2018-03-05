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
    // This.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
  }
};
