import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router';
import store from './redux/store';

// Pages
import App from './App';
import Home from './scenes/home/home';
import Games from './scenes/games/games';
import Signup from './scenes/signup/signup';
import SignupConfirmation from './scenes/signupConfirmation/signupConfirmation';
import './index.css';
import './customElements.css';
import './modifiers.css';

const history = createHistory();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App></App>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
);
