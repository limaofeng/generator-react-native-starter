'use strict';
const Generator = require('yeoman-generator');
const lodash = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.base = opts.base;
    this.packages = {};
  }

  prompting() {
    const prompts = [
      {
        name: 'plugins',
        type: 'checkbox',
        message: '选择需要安装的插件',
        choices: [
          {
            name: 'react-native-vector-icons',
            value: 'react-native-vector-icons',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  configuring() {
    for (let pluginName of this.props.plugins) {
      const plugin = this.fs.readJSON(this.templatePath(`${pluginName}/package.json`));
      lodash.merge(this.packages, plugin);
    }
    // React-native-vector-icons
    if (this.props.plugins.includes('react-native-vector-icons')) {
      // Configuration src/utils/index.js
      this.base.blocks(
        'src/utils/index.js',
        'imports',
        this.fs.read(this.templatePath('react-native-vector-icons/utils-imports.js'))
      );
      this.base.blocks(
        'src/utils/index.js',
        'exports',
        this.fs.read(this.templatePath('react-native-vector-icons/utils-exports.js'))
      );
      // Configuration src/App.js
      this.base.blocks('src/App.js', 'local-imports', "import { loadFonts } from './utils';");
      this.base.blocks('src/App.js', 'functions', 'loadFonts();');
      // Configuration ios/Podfile
      this.base.blocks('ios/Podfile', 'imports', this.fs.read(this.templatePath('react-native-vector-icons/Podfile')));
      // Configuration Test
      this.base.blocks(
        'config/jest/setupTests.js',
        'mocks',
        this.fs.read(this.templatePath('react-native-vector-icons/config/jest/setupTests-mock.js'))
      );
    }
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), this.packages);
  }

  install() {}
};
