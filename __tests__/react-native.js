'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-native-starter:react-native', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/react-native'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
