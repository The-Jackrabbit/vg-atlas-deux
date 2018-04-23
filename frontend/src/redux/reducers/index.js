import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import SignupPageReducer from './signupPageReducer';

export default combineReducers({
	routing: routerReducer,
	signupPage: SignupPageReducer,
});