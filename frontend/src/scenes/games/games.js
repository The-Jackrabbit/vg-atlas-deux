import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';//dispatch
import * as actionTypes from '../../redux/actions/signupPageActions';

let propTypes = {
	
	// redux dispatchers
};


const Games = (props) => {
	return (
		<div className="page-home page">
			<h1>games</h1>
		</div>
	);
};

Games.propTypes = propTypes;

const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Games);