import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Pages
import Home from './scenes/home/home';
import Games from './scenes/games/games';
import Library from './scenes/library/library';
import Signup from './scenes/signup/signup';
import NotFoundPage from './scenes/notFound/notFoundPage';
import SignupConfirmation from './scenes/signupConfirmation/signupConfirmation';

import Navbar from './components/side-navbar/navbar';

const App = () => {
	return (
		<div className='viewport-container'>
			<div className='navbar-container'>
				<Navbar></Navbar>
			</div>
			<div className='body-container' style={{minHeight: '100vh'}}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/games/" component={Games} />
					<Route exact path="/library/" component={Library} />
					<Route exact path="/signup/" component={Signup}/>
					<Route exact path="/signupConfirmation/" component={SignupConfirmation}/>
					<Route path="/" component={NotFoundPage} />
				</Switch>
			</div>
		</div>
		
	);
};

export default App;
