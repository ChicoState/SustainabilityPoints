import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import expect from 'expect';
//import {mapStateToProps, mapDispatchToProps} from '../screens/SignUpScreen.js';
import SignUpScreen from "../screens/SignUpScreen.js";
import configureStore from 'redux-mock-store';

import renderer from 'react-test-renderer';


jest.mock('../actions');
import * as actions from '../actions';

const mockStore = configureStore([]);

describe('signUpScreen', () => {
	let wrapper, store;
	it('should show ', () => {
		const initialState = {
			user: 'user'
		};

		// Just call the method directly passing in sample data
		// to make sure it does what it's supposed to
		//expect(mapStateToProps(initialState).user).toEqual('user');
	});
});

/*describe('Connect sign up screen component', () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			myState: 'sample text',
		});

		component = renderer.create(
			<Provider store={store}>
			<SignUpScreen />
			</Provider>
		);
	});

	it('should render with given state from Redux store', () => {
		//expect(component.toJSON()).toMatchSnapshot();
	});

	it('should dispatch an action on button click', () => {

	});
});*/
