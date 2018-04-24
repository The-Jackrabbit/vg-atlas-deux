import React, { Component } from 'react';
import Input from './Input/input';
import Submit from './Submit/submit';
import './signupForm.css';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';//dispatch

import * as actionTypes from '../../../redux/actions/signupPageActions';

let propTypes = {
	finishSignup: PropTypes.func.isRequired,
	
	// redux dispatchers
	updateUsername: PropTypes.func.isRequired,
	updatePassword: PropTypes.func.isRequired,
};

let defaultProps = {
	
};

export class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValidity: {
				username: false,
				password: false,
			},
			inputValues: {
				username: '',
				password: '',
			},
			passwordProgress: {
				numberOfCapitals: false,
				numberOfSymbols: false,
				numberOfNumbers: false,
				minimumLength: false,
				noRestrictedWords: false
			},
			passwordReqs: {
				numberOfCapitals: 1,
				numberOfSymbols: 1,
				numberOfNumbers: 1,
				minimumLength: 8,
				noRestrictedWords: true,
				passwordsMatch: true,
				restrictedWords: ['password', 'user', 'username']
			},
		};
		this.handleFormInput = this.handleFormInput.bind(this);
		this.processSubmit = this.processSubmit.bind(this);

		this.validateUsername = this.validateUsername.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	handleFormInput(event, context) {

		this.setState({
			inputValues: {
				...this.state.inputValues,
				[context]: event.target.value,
			}
		});
	}

	validateUsername(event) {
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				username: event.target.value.length > 0
			}
		});
	}

	validatePassword(event) {
		let value = event.target.value;
		let countCapitals = value.replace(/[^A-Z]/g, '').length;
		let countNumbers = value.replace(/[^0-9]/g, '').length;
		let countSymbols = value.replace(/[^&%$#@!?]/g, '').length;
		let isValid = true;
		let tests = {};

		if (this.state.passwordReqs.numberOfCapitals) {
			tests['numberOfCapitals'] = this.state.passwordReqs.numberOfCapitals <= countCapitals;
		}
		if (this.state.passwordReqs.numberOfNumbers) {
			tests['numberOfNumbers'] = this.state.passwordReqs.numberOfNumbers <= countNumbers; 
		}
		if (this.state.passwordReqs.numberOfSymbols) {
			tests['numberOfSymbols'] = this.state.passwordReqs.numberOfSymbols <= countSymbols; 
		}
		if (this.state.passwordReqs.minimumLength) {
			tests['minimumLength'] = this.state.passwordReqs.minimumLength <= value.length; 
		}
		if (this.state.passwordReqs.noRestrictedWords) {
			tests['noRestrictedWords'] = !this.state.passwordReqs.restrictedWords.includes(value); 
		}

		this.setState({
			passwordProgress: tests
		});

		const andAllReducer = (previous, currentTest) => previous&&currentTest;
		isValid = Object.values(tests).reduce(andAllReducer, isValid);

		let passwordsMatch = this.state.inputValues.passwordConfirm === event.target.value;
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				password: isValid,
			}
		});
	}

	processSubmit(event) {
		const andAllReducer = (previous, currentTest) => previous&&currentTest;
		let isSubmittable = Object.values(this.state.inputValidity).reduce(andAllReducer);
		if (isSubmittable) {
			const url = 'http://localhost:3002/login';
			fetch(url, {
				body: JSON.stringify(this.state.inputValues), // must match 'Content-Type' header
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, same-origin, *omit
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // *client, no-referrer
			}).then((response) => {
				return response.json();
			}).then((data) => {
				if (data.status === 'Passwords match!') {
					this.props.updateUsername(data.resp.username);
				}
				this.props.finishSignup(data);
			});

		} else {
			alert('you fucked up kid!');
		}
	}

	render() {
		return (
			<div className='form-inputs signup-form'>
				<Input 
					context='username'
					name='Username'
					invalidText='Username is invalid'
					emptyText={'Username can\'t be empty'}
					validator={this.validateUsername}
					isValid={this.state.inputValidity.username}
					onChange={this.handleFormInput}>
				</Input>
				<Input 
					inputType='password'
					context='password'
					name='Password'
					invalidText='Password is invalid'
					emptyText={'Password can\'t be empty'}
					onChange={this.handleFormInput}
					validator={this.validatePassword}
					isValid={this.state.inputValidity.password}
					reqs={this.state.passwordReqs}
					passwordProgress={this.state.passwordProgress}
					restrictedWords={this.state.passwordReqs.restrictedWords}>
				</Input>
				<Submit 
					value='LOGIN'
					onClick={this.processSubmit}>
				</Submit>
				<div className='grid login-redirect standard-size'>
					<div className="question">
						<p style={{
							color: '#BCBCBC'
						}}>{'Don\'t have an account?'}</p>
					</div>
					<div className="btn">
						<button className="btn-blue-light" 
							style={{
								width: '100pt',
							}}>
							<Link to="/signup/" style={{display: 'block', height: '100%'}}>Signup</Link>
						</button>
					</div>
				</div>
			</div>
		
		);
	}
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

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
		updatePassword: (input) => dispatch({
			type: actionTypes.UPDATE_PASSWORD,
			payload: input,
		}),
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);