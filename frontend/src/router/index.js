import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import Home from '../scenes/home/home';
import Games from '../scenes/games/games';
import Library from '../scenes/library/library';
import Search from '../scenes/search/search';
import Signup from '../scenes/signup/signup';
import Login from '../scenes/login/login';
import NotFoundPage from '../scenes/notFound/notFoundPage';
import SignupConfirmation from '../scenes/signupConfirmation/signupConfirmation';

const Router = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route exact path="/games/" component={Games} />
			<Route exact path="/library/" component={Library} />
			<Route exact path="/search/" component={Search} />
			<Route exact path="/login/" component={Login}/>
			<Route exact path="/signup/" component={Signup}/>
			<Route exact path="/signupConfirmation/" component={SignupConfirmation}/>
			<Route path="/" component={NotFoundPage} />
		</Switch>
	);
};

export default Router;
