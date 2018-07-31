import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './searchBar.css';

const propTypes = {
	handleInput: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,

	placeholder: PropTypes.string,
	// redux dispatchers
};

const defaultProps = {
	placeholder: 'Search',
};


const SearchBar = ({handleInput, handleSubmit, placeholder}) => {
	const handlePressEnterSubmit = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};
	return (
		<div className="search-bar-container">

			<input className="search-bar"
				placeholder={placeholder}
				onChange={handleInput}
				onKeyPress={handlePressEnterSubmit}
			/>

		</div>
	);
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default SearchBar;