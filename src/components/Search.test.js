import React from 'react';
import { render, shallow } from 'enzyme';
import { Beer } from './Beer';
import { Search } from './Search';

describe('<Search />', () => {
    it('render the beers', () => {
        const props = {
            updateInSearch: () => {
                
            }
        }
        const beers = [
            {
                "id": 192,
                "name": "Punk IPA 2007 - 2010",
                "tagline": "Post Modern Classic. Spiky. Tropical. Hoppy.",
                "first_brewed": "04/2007",
                "description": "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
                "image_url": "https://images.punkapi.com/v2/192.png"
            }, 
            {
                "id": 193,
                "name": "BUZZ",
                "tagline": "Test Beers.",
                "first_brewed": "04/2010",
                "description": "Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.",
                "image_url": "https://images.punkapi.com/v2/193.png"
            }
        ]
        const wrapper = shallow(<Search {...props}
            beers={beers}
        />);
        expect(wrapper.find(Beer).length).toBe(beers.length);
    })

})
