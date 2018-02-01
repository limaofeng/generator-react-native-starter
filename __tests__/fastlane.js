'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-native-starter:fastlane', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/fastlane'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
