import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';//dispatch
import * as actionTypes from '../../redux/actions/signupPageActions';
import './notFoundPage.css';
let propTypes = {
	// redux dispatchers
};


const NotFoundPage = (props) => {
	return (
		<div className="page-404 page">
			<div className="page-contents" >
				<div className='message'>
					<p className="text-144">:( </p>
					<br />
					<p className="text-36">404 - Page Not Found</p>
				</div>
			</div>
		</div>
	);
};

NotFoundPage.propTypes = propTypes;

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
)(NotFoundPage);