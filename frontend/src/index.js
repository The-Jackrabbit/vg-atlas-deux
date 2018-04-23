import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import store from './redux/store';

// Pages
import Home from './scenes/home/home';
import Games from './scenes/games/games';
import Signup from './scenes/signup/signup';
import SignupConfirmation from './scenes/signupConfirmation/signupConfirmation';
import './index.css';

const history = createHistory();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch style={{minHeight: '100vh'}}>
				<Route exact path="/" component={Home}/>
				<Route path="/games/" component={Games} />
				<Route path="/signup/" component={Signup}/>
				<Route path="/signupConfirmation/" component={SignupConfirmation}/>
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
