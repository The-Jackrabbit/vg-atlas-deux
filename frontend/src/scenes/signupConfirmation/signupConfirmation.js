import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';

class SignupConfirmation extends Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		return(
			<div className="page-signup-confirmation page">
				<Navbar></Navbar>
				<div className="page-contents">
					<h2>Welcome to the club kiddo!</h2>
				</div>
			</div>
		);
	}
}


export default SignupConfirmation;