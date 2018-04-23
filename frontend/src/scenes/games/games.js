import React from 'react';

import Navbar from '../../components/navbar/navbar';
import { connect } from 'react-redux';//dispatch
import * as actionTypes from '../../redux/actions/signupPageActions';
const Games = (props) => {
	return (
		<div className="page-home page">
			<Navbar></Navbar>
			<h1>games</h1>
			<h2>{props.username}</h2>
			<input value={props.username} onChange={() => props.updateUsername('check')} />
		</div>
	);
};


const mapStateToProps = (state) => {
	return {
		username: state.signupPage.username
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateUsername: (input) => {
			console.log('updating username from actions');
			dispatch({
				type: actionTypes.UPDATE_USERNAME,
				payload: input,
			});
		},
		updateEmail: (input) => dispatch({
			type: actionTypes.UPDATE_EMAIL,
			payload: input,
		}),
		updatePassword: (input) => dispatch({
			type: actionTypes.UPDATE_PASSWORD,
			payload: input,
		}),
		updatePasswordConfirm: (input) => dispatch({
			type: actionTypes.UPDATE_CONFIRM_PASSWORD,
			payload: input,
		}),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Games);