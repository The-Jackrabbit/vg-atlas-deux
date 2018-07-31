import React from 'react';
import {
	Route,
	Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
	redirectUrl: PropTypes.string,
	component: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};

const defaultProps = {
	redirectUrl: '/login',
	isAuthenticated: false,
};

const PrivateRoute = ({ 
	component: Component,
	redirectUrl,
	isAuthenticated,
	...rest 
}) => (
	<Route
		{...rest}
		render={ (props) => {
			if (isAuthenticated) {
				return <Component {...props} />;
			}
			return <Redirect to={{ pathname: redirectUrl }} />;
		}}
	/>
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

export default PrivateRoute;