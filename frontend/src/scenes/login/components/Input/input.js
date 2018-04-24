import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './input.css';
import PasswordTip from './PasswordTip/passwordTip';
import StatusIcon from '../Icons/statusIcon';
import ErrorMessage from './ErrorMessage/errorMessage';

let propTypes = {
	name: PropTypes.string.isRequired,
	context: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	invalidText: PropTypes.string.isRequired,
	emptyText: PropTypes.string.isRequired,
	validator: PropTypes.func,
	isValid: PropTypes.bool,
	inputType: PropTypes.string,
	defaultValue: PropTypes.string,
	value: PropTypes.string,

	// for passwords
	reqs: PropTypes.object,
	restrictedWords: PropTypes.array,	
	passwordProgress: PropTypes.object,	
};

let defaultInputProps = {
	inputType: 'text',
	isValid: true,
	defaultValue: '',
	value: '',
};

class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			touched: false,
			labelIsVisible: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillMount() {
		this.setState({
			passwordProgress: (this.props.context === 'password') ? {} : null,
			isEmpty: this.props.value.length === 0,
			placeholder: this.props.name,
			value: this.props.value,
			errorMessage: `${this.props.name} is invalid`,
		});
	}

	componentWillReceiveProps(nextProps){
		// updates confirmPassword when password field is updated to match passwordConfirm field
		if ('isValid' in nextProps && this.props.context === 'passwordConfirm') {
			this.setState({
				isValid: nextProps.isValid,
				showErrorMessage: (this.state.touched || this.state.engaged) && !nextProps.isValid,
			});
		}
	}

	handleChange(event) {
		// call onChange method on the parent component for updating its state
		this.props.onChange(event, this.props.context);
		this.props.validator(event);

		this.setState({
			value: event.target.value,
			isEmpty: event.target.value.length < 1,
			touched: true,
			showErrorMessage: !this.props.isValid,
			errorMessage: (event.target.value.length < 1) 
				? this.props.emptyText 
				: this.props.invalidText,
		});
	}
	
	handleFocus() {
		this.setState({
			focus: true,
			placeholder: '',
			labelIsVisible: true,
			engaged: true
		});
	}
	handleBlur() {
		this.setState({
			focus: false,
			placeholder: this.props.name,
			labelIsVisible: !this.state.isEmpty,
		});
	}
	
	render() {
		return (
			<div className='input grid form-input'>
				<div className='input-container standard-size grid'>
					<div className='input-area'>
						{this.state.labelIsVisible && 
							<label className='input-label' htmlFor={this.props.name}>
								<span className='label-text'>{this.props.name}</span>
							</label>
						}
						<input 
							type={this.props.inputType}
							id={this.props.name}
							value={this.state.value} 
							placeholder={this.state.placeholder}
							onChange={this.handleChange}
							onFocus={this.handleFocus}
							onBlur={this.handleBlur}
							autoComplete='off'
						/>
						
					</div>
					<div className='status-icon-area'>
						{
							this.state.touched &&
							<StatusIcon 
								isValid={this.props.isValid}
								height='18pt'
								width='18pt'
							></StatusIcon>
						}
					</div>
					
				</div>
				<div className='error-message'>
					{ 
						this.state.focus && this.props.context === 'password' && 
						<div className='password-tip-container'>
							{/*<PasswordTip
								reqs={this.props.reqs}
								passwordProgress={this.props.passwordProgress}
								isValid={this.props.isValid}
								restrictedWords={this.props.restrictedWords}
								noRestrictedWords={this.state.noRestrictedWords}
							></PasswordTip>*/}
						</div>
					}
					{

						!this.props.isValid && this.state.touched && 
						<ErrorMessage errorMessage={this.state.errorMessage}></ErrorMessage>
					}
				</div>
			</div>
		);
	}
}

Input.propTypes = propTypes;
Input.defaultProps = defaultInputProps;

export default Input;
