import React from 'react';

//test stuff
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//import helper file
import {BurgerBuilder} from './BurgerBuilder';
import buildControls from '../../components/Burger/BuildControls/BuildControls';


configure({adapter:new Adapter()})
describe ('<BurgerBuilder/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onIngredientInit={()=>{}} />)
    })
    it('should render <BuildControls/> when receving ingredients',()=>{
        wrapper.setProps({ings:{salad:0}})
        expect(wrapper.find(buildControls)).toHaveLength(1)
    })

})

