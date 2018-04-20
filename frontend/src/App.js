import React, { Component } from 'react';
import Home from './scenes/home/home';
import Signup from './scenes/signup/signup';
import SignupConfirmation from './scenes/signupConfirmation/signupConfirmation';

import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

class App extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				username: 'james',
				email: 'james@bg.com',
				password: '12345',
			},
		};

	}

	render() {
		return (
			<Router>
				<div style={{minHeight: '100vh'}}>
					<Route exact path="/" component={Home} />
					<Route path="/signup/" component={Signup} />
					<Route path="/signupConfirmation/" component={SignupConfirmation} />
				</div>
			</Router>
		);
	}
}

export default App;
