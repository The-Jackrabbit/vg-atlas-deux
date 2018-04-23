import React, { Component } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import Navbar from '../../components/navbar/navbar';
import SignupForm from './components/signupForm';

import './signup.css';

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

Signup.propTypes = propTypes;



export default Signup;
