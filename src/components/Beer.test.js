import React from 'react';
import { shallow } from 'enzyme'
import { Beer } from './Beer';
import { Button } from 'reactstrap';

const beer = {
    "id": 192,
    "name": "Punk IPA 2007 - 2010",
    "tagline": "Post Modern Classic. Spiky. Tropical. Hoppy.",
    "first_brewed": "04/2007",
    "description": "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
    "image_url": "https://images.punkapi.com/v2/192.png"
}
const handleFavorite = jest.fn();

describe('<Beer />', () => {
    it('render', () => {
        const wrapper = shallow(<Beer beer={beer} checkFavoritos={() => {}} />);
    })
    it('handle favorite button', () => {
        const wrapper = shallow(<Beer beer={beer} checkFavoritos={() => {}} handleFavorite={handleFavorite} />);
        
        wrapper.find(Button).simulate('click');
        expect(handleFavorite).toBeCalledWith(beer);
    })
    it('handle show button', () => {
        const onClick = jest.fn();
        const wrapper = shallow(<Beer beer={beer} checkFavoritos={() => {}} handleFavorite={handleFavorite}  onClick={onClick} />);
        
        wrapper.find('div').simulate('click');
        expect(onClick).toBeCalledWith(beer);
    })
})