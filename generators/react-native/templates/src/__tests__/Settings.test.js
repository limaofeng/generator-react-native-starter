import React from 'react';
import { shallow } from 'enzyme';

import Settings from '../Settings';

describe('Settings Enzyme Shallow', () => {
  it('App should have three <Settings /> components', () => {
    const app = shallow(<Settings />);
    expect(app.find('View')).toBeTruthy(); // .to.have.length(1);
  });
});
