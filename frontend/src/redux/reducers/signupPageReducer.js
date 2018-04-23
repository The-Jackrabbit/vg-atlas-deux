import * as actionTypes from '../actions/signupPageActions';
const initialSignupPageState = {
	username: 'lsm5fm',
	email: '',
	password: '',
	confirmPassword: '',
};

const signupPageReducer = (state = initialSignupPageState, action) => {
	switch (action.type) {
	case actionTypes.UPDATE_USERNAME:
		const newState = {
			...state,
			username: action.payload,
		};
		
		console.log({
			initialMessage: 'updating username from reducer',
			oldState: state,
			newState: newState,
		});
		
		return {
			...state,
			username: action.payload,
		};
	case actionTypes.UPDATE_EMAIL:
		return {
			...state,
			email: action.payload,
		};
	case actionTypes.UPDATE_PASSWORD:
		return {
			...state,
			password: action.payload,
		};
	case actionTypes.UPDATE_CONFIRM_PASSWORD:
		return {
			...state,
			passwordConfirm: action.payload,
		};
	default:
		return state;
	}
};

export default signupPageReducer;