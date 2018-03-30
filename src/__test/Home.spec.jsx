import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/pages/home/Home.jsx';


test('Home renders correctly', () => {
    const component = renderer.create('<Home />');
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});