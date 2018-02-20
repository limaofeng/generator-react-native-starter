module.exports = wallaby => ({
  files: [
    { pattern: 'src/**/*.+(json|jpg|jpeg|gif|png|svg)', instrument: false },
    'src/**/*.js?(x)',
    '!src/**/__tests__/**/*.js?(x)'
  ],
  tests: ['src/**/__tests__/**/*.test.js?(x)'],
  compilers: {
    'src/**/*.js?(x)': wallaby.compilers.babel()
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
