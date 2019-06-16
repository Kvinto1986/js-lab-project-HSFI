import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme/build';

import Home from './Home';

it('renders without crashing', () => {
    shallow(<Home />);
});
