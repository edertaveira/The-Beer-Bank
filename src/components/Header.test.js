import React from 'react';
import { shallow } from 'enzyme'
import { Header } from './Header';
import { Input, Button } from 'reactstrap';

describe('<Header />', () => {

    it('handle search', () => {
        const handleOnKeyUp = jest.fn();
        const wrapper = shallow(<Header handleOnKeyUp={handleOnKeyUp} />);
        const event = {
            target: { value : 'Test' }
        }

        wrapper.find(Input).simulate('change', event);
        expect(handleOnKeyUp).toBeCalledWith(event);

    });

    it('handle clear search', () => {
        const clearSearch = jest.fn();
        const wrapper = shallow(<Header clearSearch={clearSearch} inSearch={true} />);
        const event = {
            target: { value : 'Test' }
        }

        wrapper.find(Input).simulate('change', event);
        wrapper.find(Button).simulate('click')
        expect(clearSearch).toBeCalled();

    });

})