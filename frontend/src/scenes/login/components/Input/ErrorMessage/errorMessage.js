import React from 'react';
import './errorMessage.css';
import PropTypes from 'prop-types';

let propTypes = {
	errorMessage: PropTypes.string,
};
let defaultProps = {
	errorMessage: 'Input value is invalid',
};

const ErrorMessage = ({errorMessage}) => {
	return (
		<div className='error'>
			<p>{errorMessage}</p>
		</div>
	);
};

ErrorMessage.propTypes = propTypes;
ErrorMessage.defaultProps = defaultProps;
export default ErrorMessage;