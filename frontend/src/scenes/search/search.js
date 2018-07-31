import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';//dispatch
import * as actionTypes from '../../redux/actions/signupPageActions';
import './search.css';
import SearchBar from './components/search-bar/searchBar';


let propTypes = {
	// redux dispatchers
};


class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchQuery: '',
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(event) {
		this.setState({
			searchQuery: event.target.value,
		});
		console.log(event.target.value);
	}
	handleSubmit() {
		console.log(`submitting : ${this.state.searchQuery}`);
	}
	render() {
		return (
			<div className="page-search page">
				<div className="page-contents">
					<div className="search-container">
						<SearchBar
							value={this.state.searchQuery}
							handleInput={this.handleInput}
							handleSubmit={this.handleSubmit}>
						</SearchBar>
					</div>
					<div className="results-container">
						results
					</div>
				</div>
			</div>
		);
	}
};

Search.propTypes = propTypes;

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
)(Search);