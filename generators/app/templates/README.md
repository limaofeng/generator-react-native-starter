# VPSER

# eslint + prettier
安装 eslint
```
yarn add eslint babel-eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --dev
```
安装 prettier
```
yarn add prettier lint-staged eslint-plugin-prettier --dev
```
package.json 中添加 eslint 配置
```
  "eslintConfig": {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
      "react",
      "jsx-a11y",
      "import",
      "prettier"
    ],
    "env": {
      "jasmine": true
    },
    "rules": {
      "indent": 0,
      "space-before-function-paren": 0,
      "prettier/prettier": "error",
      "global-require": "off",
      "comma-dangle": 0,
      "no-restricted-syntax": 0,
      "no-use-before-define": 0,
      "no-param-reassign": "warn",
      "object-curly-newline": "off",
      "function-paren-newline": "off",
      "react/prefer-stateless-function": "off",
      "no-console": 1,
      "max-len": [
        2,
        120,
        4
      ],
      "arrow-parens": [
        "error",
        "as-needed"
      ],
      "consistent-return": 0,
      "no-confusing-arrow": 0,
      "no-shadow": 0,
      "no-underscore-dangle": 0,
      "no-debugger": 1,
      "no-continue": "warn",
      "no-plusplus": [
        "error",
        {
          "allowForLoopAfterthoughts": true
        }
      ],
      "semi": 2,
      "import/no-extraneous-dependencies": 0,
      "import/prefer-default-export": 0,
      "import/no-duplicates": 0,
      "import/no-unresolved": [
        2,
        {
          "ignore": [
            ".png^"
          ]
        }
      ],
      "jsx-a11y/label-has-for": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "react/no-multi-comp": 0,
      "react/no-array-index-key": [
        1
      ],
      "react/forbid-prop-types": 0,
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx"
          ]
        }
      ]
    }
  }
```
package.json 中添加 prettier 配置 
```
  "prettier": {
    "tabWidth": 2,
    "printWidth": 120,
    "singleQuote": true
  },
  "lint-staged": {
    "src/**/*.{js,jsx}": [
      "prettier --write",
      "git add"
    ]
  },
```

# jest
安装
```
yarn add jest react-test-renderer --dev
```
package.json 中添加配置 
```
"jest": {
  "preset": "react-native",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx}"
  ],
  "setupFiles": [
    "<rootDir>/config/jest/setupTests.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.js?(x)",
    "<rootDir>/src/**/?(*.)(spec|test).js?(x)"
  ],
  "transform": {
    "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
    "^(?!.*\\.(js|jsx)$)": "<rootDir>/config/jest/fileTransform.js"
  }
},
```
fileTransform.js 
```
const path = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
```
setupTests.js
```
/* eslint-env jest */
import React from 'react';

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn().mockImplementation((value: string) => Promise.resolve(value))
}));

jest.mock('ScrollView', () => {
  const RealComponent = require.requireActual('ScrollView');
  class ScrollView extends RealComponent {
    scrollTo = () => {};
  }
  return ScrollView;
});

const { setState } = React.Component.prototype;
Object.defineProperty(React.Component.prototype, 'setState', {
  value() {
    setImmediate((...args) => {
      setState.apply(this, args);
    });
  }
});

Date.now = jest.fn(() => 0);
```

# wallaby.js
根目录添加 wallaby.js
```
module.exports = wallaby => ({
  files: [{ pattern: 'src/**/*.+(js|jsx|json|jpg|jpeg|gif|png|svg)', instrument: false }, '!src/**/*.test.js?(x)'],
  tests: ['src/**/*.test.js?(x)'],
  compilers: {
    'src/**/*.js': wallaby.compilers.babel()
  },
  env: {
    type: 'node',
    runner: 'node'
  },
  testFramework: 'jest',
  setup(wallaby) {
    const jestConfig = require('./package.json').jest;
    jestConfig.globals = { __DEV__: true };
    wallaby.testFramework.configure(jestConfig);
  },
  debug: true
});
```

# fastlane

## 证书

先在 `Certificates, Identifiers & Profiles` 与 `iTunes Connect` 中新建 App ID 与
```
cd ios && fastlane init ios && move fastlane ../fastlane
# 初始化 Matchfile
fastlane match init
# 自动生成证书
fastlane match development/appstore/adhoc
# 修改 iTunes Connect 中的应用数据
fastlane deliver
```

## 版本号 与 BUILD ID
```
# 修改版本号与BUILD号
def prepare_version(options = {})
  if options[:version].nil?
    options[:version] = (sh "git describe --tags --abbrev=0").gsub(/^[v]/,'') # 获取分支最近的 tags 作为版本号
  end
  if options[:build].nil?
    options[:build] = latest_testflight_build_number + 1 # 获取 testflight 中的 build_number + 1
  end
  increment_version_number(
      version_number: options[:version],
      xcodeproj: "./ios/vpser.xcodeproj"
  )
  increment_build_number(
      build_number: options[:build],
      xcodeproj: "./ios/vpser.xcodeproj"
  )
end
```
## 截图与加壳
```
  desc "自动截图"
  lane :screenshot do
    capture_screenshots
    frame_screenshots
  end
```

## 上传到 TestFlight
```
  desc "提交一个新的测试版本 Apple TestFlight"
  lane :beta do
    screenshot
    build
    upload_to_testflight(changelog: changelog_from_git_commits(
      between: ["ed2a506", "HEAD"],
      pretty: "- %s",
      date_format: "short",
      match_lightweight_tag: false,
      merge_commit_filtering: "exclude_merges"
    ))
  end
```
