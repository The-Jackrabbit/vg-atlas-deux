import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownCaret from './components/dropdownCaret';
import Option from './components/option';
import ErrorMessage from '../Input/ErrorMessage/errorMessage';
import states from './data/states';
import './select.css';

let propTypes = {
	data: PropTypes.array,
	selectedOption: PropTypes.object,
	name: PropTypes.string,
	context: PropTypes.string,
	isValid: PropTypes.bool,
	errorMessage: PropTypes.string,

	onChange: PropTypes.func,
	validator: PropTypes.func,
};
let defaultProps = {
	selectedOption: {
		label: undefined,
		value: undefined,
	},
	placeholder: 'Select',
	name: 'Select',
	context: 'select',
	data: states,
	isValid: true,
	errorMessage: 'This field is invalid',
};

class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			// Dom/event state
			optionsVisible: false,
			touched: false,
			isFocused: false,
			// Stored values
			value: '',
			highlightedIndex: 0,
			selectedOption: {
				value: undefined,
				label: undefined,
			},
			
			resultLength: 0,
		};

		this.changeText = this.changeText.bind(this);
		this.clickOption = this.clickOption.bind(this);

		this.handleTextMouseDown = this.handleTextMouseDown.bind(this);
		this.handleTextBlur = this.handleTextBlur.bind(this);
		this.handleOptionsMouseOver = this.handleOptionsMouseOver.bind(this);
		this.handleOptionsMouseOut = this.handleOptionsMouseOut.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleArrowKey = this.handleArrowKey.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.handleOptionHover = this.handleOptionHover.bind(this);

	}
	// Lifecycle Hooks
	componentWillMount() {
		let data = this.props.data.map((element, index) => {
			element.isVisible = true;
			element.isHovered = this.state.selectedOption.value === element.value;
			element.index = index;
			return element;
		});

		this.setState({
			resultLength: data.length,
			errorMessage: this.props.errorMessage,
			data: data,
		});
	}
	
	// Business Logic
	getFirstMatchOnType(inputText) {
		let matchingResult;
		
		for (let i = 0 ; i < this.state.data.length; i++) {
			let label = this.state.data[i].label;
			let match = this.wordsMatch(inputText.toLowerCase(), label.toLowerCase());

			if (match) {
				matchingResult = this.state.data[i];
				break;
			}
		}

		if (this.matchingResult) {
			this.setState({
				selected: {...matchingResult}, 
			});
		}
		
		return matchingResult;
	}

	updateResults(newSelectedValue, inputText) {
		let data = this.state.data;
		let resultLength = 0;
		data.forEach((element, i) => {
			let {label, value, index} = element;
			let match = true;

			if (inputText) {
				match = this.wordsMatch(inputText.toLowerCase(), label.toLowerCase()) 
						|| this.wordsMatch(inputText.toLowerCase(), value.toLowerCase());
			}
			
			element.isHovered = (this.state.highlightedIndex === index);
			element.isVisible = match;
			resultLength += 1*match;
			
		});
		this.setState({
			data: data,
			resultLength: resultLength,
		});
	}

	// Utility Functions
	wordsMatch(inputText, optionLabel, optionValue) {
		let match = false;

		match = optionLabel.includes(inputText)||optionLabel.includes(inputText);

		return match;
	}

	// Event Functions
	clickOption(event, label, value) {
		this.props.onChange(event, this.props.context);
		this.props.validator(event);
		this.updateResults(value);

		this.setState({
			value: label,
			selectedOption: {
				label: label,
				value: value,
			},
			optionsVisible: false,
			overOptions: false,
			touched: true,
		});
	}

	changeText(event) {
		let inputText = event.target.value;

		this.setState({
			value: inputText,
			touched: true,
		});

		let firstMatchingValue = this.getFirstMatchOnType(inputText);
		this.props.onChange(event, this.props.context);
		this.props.validator(event);
		this.updateResults(firstMatchingValue, inputText);
	}

	// Keyboard Input 
	handleKeyPress(event) {
		if (event.key === 'Enter' && this.state.optionsVisible) {
			this.handleEnterKey();
		}
		if (event.key === 'ArrowUp' && this.state.optionsVisible) {
			this.handleArrowKey('up');
		}
		if (event.key === 'ArrowDown' && this.state.optionsVisible) {
			this.handleArrowKey('down');
		}
	}

	handleArrowKey(direction) {
		let offset = (direction === 'up') ? -1: 1;
		let newIndex = (this.state.highlightedIndex + offset)%this.state.resultLength;
		this.setState({
			highlightedIndex: newIndex,
		});
		this.updateResults(this.state.selectedOption);
	}

	handleEnterKey(event) {
		this.props.onChange(event, this.props.context);
		this.props.validator(event);

		this.setState({
			value: this.state.data[this.state.highlightedIndex].label,
			selected: this.state.data[this.state.highlightedIndex].value,
			optionsVisible: false,
			currentlyEngaged: false,
		});
		this.updateResults(this.state.data[this.state.highlightedIndex].value);
	}

	handleTextMouseDown() {
		this.setState({
			optionsVisible: true,
			placeholder: '',
			currentlyEngaged: true,
			
		});
	}

	handleTextBlur() {
		this.setState({
			optionsVisible: this.state.overOptions&&this.state.currentlyEngaged,
			
		});
	}

	handleOptionsMouseOver() {
		this.setState({
			overOptions: true,
		});
	}

	handleOptionsMouseOut() {
		this.setState({
			overOptions: false,
		});
	}

	handleOptionHover(index) {
		this.setState({
			highlightedIndex: index,
		});	
	}

	render() {
		return (
			<div className='select input grid form-input'
				onBlur={this.handleTextBlur}
				onKeyUp={this.handleKeyPress}>
				<div className='input-container grid'>
					<div className='input-area'>
						{(this.state.optionsVisible || this.state.value.length > 0) &&
						<label htmlFor={`dropdown-input${this.props.name}`}>{this.props.name}</label>
						}
						<input 
							type='text' 
							id={`dropdown-input${this.props.name}`}
							value={this.state.value}
							placeholder={!this.state.optionsVisible ? this.props.name: ''} 
							onChange={this.changeText} 
							onMouseDown={this.handleTextMouseDown}
						/>
						
					</div>
					<div className='status-icon-area'>
						<DropdownCaret
							fill={this.state.optionsVisible ? '#59A5F7': '#D8D8D8'}
						>
						</DropdownCaret>
					</div>
					
				</div>
				<div className='error-message'>
					{ (!this.props.isValid && this.state.touched) &&
						<ErrorMessage
							isVisible={true}
							errorMessage={this.state.errorMessage}>
						</ErrorMessage>
					}
				</div>
				<div className='select-results'
					onMouseOver={this.handleOptionsMouseOver}
					onMouseOut={this.handleOptionsMouseOut}>
					{
						this.state.optionsVisible && 
						this.state.data.map(({value, label, isHovered, isVisible}, index) => 
							<Option 
								value={value} 
								key={value} 
								label={label} 
								index={index}
								isHovered={this.state.highlightedIndex === index} 
								isVisible={isVisible}
								onClick={this.clickOption}
								onMouseEnter={this.handleOptionHover}>
							</Option>
						)
					}
				</div>
			</div>
		);
	}
}

Select.defaultProps = defaultProps;
Select.propTypes = propTypes;

export default Select;
