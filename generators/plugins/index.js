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
            name: 'react-native-vector-icons 是一款可以使用字体图标的插件',
            value: 'react-native-vector-icons',
            checked: false
          },
          {
            name: 'react-native-i18n 是一款国际化插件',
            value: 'react-native-i18n',
            checked: false
          },
          {
            name: 'react-native-push-notification 是一个封装 RN 通知插件',
            value: 'react-native-push-notification',
            checked: false
          },
          {
            name: 'react-native-sound 是一个可以在 RN 中播放音乐的插件',
            value: 'react-native-sound',
            checked: false
          },
          {
            name: 'react-native-splash-screen 是一个图片启动页插件',
            value: 'react-native-splash-screen',
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
      if (!this.fs.exists(this.templatePath(`${pluginName}/package.json`))) {
        continue;
      }
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
      this.base.blocks('src/App.js', 'local-imports', "import { loadFonts } from './utils';\r\n");
      this.base.blocks('src/App.js', 'functions', 'loadFonts();\r\n\r\n');
      // Configuration ios/Podfile
      this.base.blocks('ios/Podfile', 'imports', this.fs.read(this.templatePath('react-native-vector-icons/Podfile')));
      // Configuration Test
      this.base.blocks(
        'config/jest/setupTests.js',
        'mocks-NativeModules',
        this.fs.read(this.templatePath('react-native-vector-icons/config/jest/setupTests-mock.js'))
      );
    }
  }

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), this.packages);
  }

  install() {}
};
