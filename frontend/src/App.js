import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Router from './router';

// Components
import Sidebar from './components/side-navbar/sidebar';
import Header from './components/header/header';

const App = () => {
	return (
		<div className='viewport-container'>
			<div className='header-container'>
				<Header />
			</div>
			<div className='sidebar-container'>
				<Sidebar />
			</div>
			<div className='body-container' style={{minHeight: '100vh'}}>
				<Router />
			</div>
		</div>
	);
};

export default App;
