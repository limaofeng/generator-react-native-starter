import React from 'react';
import { shallow } from 'enzyme';

import Home from '../Home';

describe('Home Enzyme Shallow', () => {
  it('App should have three <Home /> components', () => {
    const app = shallow(<Home />);
    expect(app.find('View')).toBeTruthy(); // .to.have.length(1);
  });
});
