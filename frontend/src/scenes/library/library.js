import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';//dispatch
import * as actionTypes from '../../redux/actions/signupPageActions';

let propTypes = {
	
	// redux dispatchers
};


const Library = (props) => {
	return (
		<div className="page-home page">
			<div className="page-contents">
				<h1>library</h1>
			</div>
		</div>
	);
};

Library.propTypes = propTypes;

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
)(Library);