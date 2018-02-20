'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-native-starter:plugins', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/plugins')).withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
