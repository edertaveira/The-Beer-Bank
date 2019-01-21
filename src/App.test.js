import React from 'react';
import App from './App';
import { Punkapi } from './api/Punkapi';
import { shallow } from 'enzyme';
import { Input } from 'reactstrap';

describe('<App />', () => {
  it('render', () => {
    const wrapper = shallow(<App Punkapi={Punkapi} />);

  })
})

