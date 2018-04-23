import React, { Component } from 'react';
import Navbar from '../../components/navbar/navbar';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

const propTypes = {
	// redux vars
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};

const SignupConfirmation = (props) => {
	return(
		<div className="page-signup-confirmation page">
			<Navbar></Navbar>
			<div className="page-contents">
				<h2>Welcome to the club kiddo!</h2>
				<p>{props.username}</p>
				<p>{props.email}</p>
			</div>
		</div>
	);	
};

SignupConfirmation.propTypes = propTypes;


const mapStateToProps = (state) => ({
	username: state.signupPage.username,
	email: state.signupPage.email,
});

export default withRouter(
	connect(
		mapStateToProps
	)(SignupConfirmation)
);