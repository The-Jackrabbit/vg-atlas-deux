import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { LoginForm } from './components/loginForm';
import './login.css';

const propTypes = {
	
};

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			signupCompleted: false,
		};

		this.finishSignup = this.finishSignup.bind(this);
	}
	componentDidMount() {
		console.log({
			props: this.props,
		});
	}
	finishSignup(result) {
		console.log({
			result: result,
		});
		this.setState({
			signupCompleted: result.status === 'Passwords match!'
		});
		
		// 
	}

	render() {
		if (!this.state.signupCompleted) {
			return(
				<div className="page-signup page">
					<div className="page-contents">
						<div className="signup-form-container standard-size">
							<LoginForm finishSignup={this.finishSignup}></LoginForm>
						</div>
					</div>
				</div>
			);
		}
		return(<Redirect to="/"/>);
	}
}

Signup.propTypes = propTypes;



export default Signup;
