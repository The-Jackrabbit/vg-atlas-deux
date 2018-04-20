import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Navbar from '../../components/navbar/navbar';
import SignupForm from './components/signupForm';
import './signup.css';


class Signup extends Component {
	constructor() {
		super();

		this.state = {
			signupCompleted: false,
		};

		this.finishSignup = this.finishSignup.bind(this);
	}

	finishSignup() {
		this.setState({signupCompleted: true});
	}

	render() {
		if (!this.state.signupCompleted) {
			return(
				<div className="page-signup page">
					<Navbar></Navbar>
					<div className="page-contents">
						<div className="signup-form">
							<SignupForm className="signup-form" finishSignup={this.finishSignup}></SignupForm>
						</div>
					</div>
				</div>
			);
		}
		return(<Redirect to="/signupConfirmation"/>);
	}
}


export default Signup;