import React from 'react';
import './submit.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
let propTypes = {
	value: PropTypes.string,
	onClick: PropTypes.func
};

let defaultSubmitProps = {
	value: 'Submit'
};

const Submit = ({value, onClick}) => {
	return (
		<div className='input grid form-input'>
			<button 
				className='btn-blue-dark standard-size' 
				onClick={onClick}>
				{value}
			</button>
		</div>
	);
};

Submit.propTypes = propTypes;
Submit.defaultProps = defaultSubmitProps;

export default Submit;
