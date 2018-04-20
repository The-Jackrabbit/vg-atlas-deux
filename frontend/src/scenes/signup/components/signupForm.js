import React, { Component } from 'react';
import Input from './Input/input';
import Submit from './Submit/submit';
import './signupForm.css';
import Select from './Select/select';
import PropTypes from 'prop-types';

import states from './Select/data/states';

let propTypes = {
	statesData: PropTypes.array,
	finishSignup: PropTypes.func.isRequired,
};

let defaultProps = {
	statesData: states,
};

export class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValidity: {
				email: false,
				username: false,
				password: false,
				passwordConfirm: false,
			},
			inputValues: {
				email: '',
				username: '',
				password: '',
				passwordConfirm: '',
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

		this.validateEmail = this.validateEmail.bind(this);
		this.validateUsername = this.validateUsername.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validatePasswordConfirm = this.validatePasswordConfirm.bind(this);
		this.validateState = this.validateState.bind(this);
	}

	handleFormInput(event, context) {
		this.setState({
			inputValues: {
				...this.state.inputValues,
				[context]: event.target.value,
			}
		});
	}
	
	validateEmail(event) {
		// regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		let re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid =  re.test(event.target.value)&&(event.target.value.length > 0);
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				email: isValid
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

		let passwordConfirmNotEmpty = this.state.inputValues.passwordConfirm.length > 0;
		let passwordsMatch = this.state.inputValues.passwordConfirm === event.target.value;
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				password: isValid,
				passwordConfirm:  passwordConfirmNotEmpty&&passwordsMatch
			}
		});
	}

	validatePasswordConfirm(event) {
		let passwordConfirmNotEmpty = event.target.value.length > 0;
		let passwordsMatch = event.target.value === this.state.inputValues.password;
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				passwordConfirm: passwordConfirmNotEmpty&&passwordsMatch
			}
		});
	}

	validateState(event) {

		let selectedValue = event.target.value.value;
		let isValid = false;
		console.log({
			func: 'validateState',
			event: event,
			'event.target.value': event.target.value,
			'this.props.statesData.': this.props.statesData,
			selectedValue: selectedValue,
		});
		this.props.statesData.forEach(({value}) => {
			if (value === selectedValue) {
				isValid = true;
			}
		});
		this.setState({
			inputValidity: {
				...this.state.inputValidity,
				state: isValid,
			}
		});
	}

	processSubmit(event) {
		const andAllReducer = (previous, currentTest) => previous&&currentTest;
		let isSubmittable = Object.values(this.state.inputValidity).reduce(andAllReducer);
		if (isSubmittable) {
			const url = 'http://localhost:8002/signup';
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
				
				this.props.finishSignup();


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
					context='email'
					name='Email address'
					invalidText='Email is invalid'
					emptyText={'Email can\'t be empty'}
					validator={this.validateEmail}
					isValid={this.state.inputValidity.email}
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
				<Input 
					inputType='password'
					context='passwordConfirm'
					name='Confirm Password'
					invalidText={'Passwords don\'t match'}
					emptyText='Please confirm your password'
					isValid={this.state.inputValidity.passwordConfirm}
					validator={this.validatePasswordConfirm}
					onChange={this.handleFormInput}>
				</Input>
				<Submit 
					value='CREATE ACCOUNT'
					onClick={this.processSubmit}>
				</Submit>
			</div>
		
		);
	}
}

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

export default SignupForm;