import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import CustomButton from '../components/CustomButton.js';
import renderer from 'react-test-renderer';



describe(CustomButton, () => {
 it('CustomButton renders title', () => {
   const customButton= shallow(<CustomButton title={"Save"} />);
 });
});


test('renders correctly', () => {
  const tree = renderer.create(<CustomButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
