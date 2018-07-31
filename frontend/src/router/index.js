import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Components
import ProtectedRoute from './auth/ProtectedRoute';

// Pages
import Home from '../scenes/home/home';
import Games from '../scenes/games/games';
import Library from '../scenes/library/library';
import Search from '../scenes/search/search';
import Signup from '../scenes/signup/signup';
import Login from '../scenes/login/login';
import NotFoundPage from '../scenes/notFound/notFoundPage';
import SignupConfirmation from '../scenes/signupConfirmation/signupConfirmation';

export default class Router extends Component {
	constructor() {
		super();
		
		this.state = {
			auth: false,
		};
	}
	
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/games/" component={Games} />
				<ProtectedRoute exact path="/library/" component={Library} />
				<Route exact path="/search/" component={Search}/>
				<Route exact path="/login/" component={Login}/>
				<Route exact path="/signup/" component={Signup}/>
				<Route exact path="/signupConfirmation/" component={SignupConfirmation}/>
				<Route path="/" component={NotFoundPage} />
			</Switch>
		);
	}
};
