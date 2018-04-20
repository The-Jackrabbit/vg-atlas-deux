import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './loginTooltip.css';

const propTypes = {
	visibility: PropTypes.string,
	handleInputFocus: PropTypes.func.isRequired
};
const defaultProps = {
	visibility: 'hidden',
};

class LoginTooltip extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: {
				username: '',
				password: '',
			},
		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(event, field) {
		this.setState({
			login: {
				...this.state.login,
				[field]: event.target.value,
			}
		});
	}

	handleLogin() {
		if (!this.state.login.username.length || !this.state.login.password.length) {
			console.log('Please fill both inputs');
		} else {
			
		}
	}

	render() {
		return (
			<div>
				<div className="login-card" id="login-card"
					style={{visibility: this.props.visibility}}>
					
					<div className="login-section">
						<p>Have an account?</p>
						<div>
							<input placeholder='Username or email'
								onFocus={(event) => this.props.handleInputFocus(event, true)}
								onBlur={(event) => this.props.handleInputFocus(event, false)}
								onChange={(event) => this.handleChange(event, 'username') }
								style={{width: '100%'}}
								value={this.state.login.username}/>
						</div>
						<div>
							<input placeholder='Password' type='password' 
								onFocus={(event) => this.props.handleInputFocus(event, true)}
								onBlur={(event) => this.props.handleInputFocus(event, false)}
								onChange={(event) => this.handleChange(event, 'password')}
								style={{width: '100%'}}
								value={this.state.login.password}/>
						</div>
						<div>
							<button className="btn-blue-dark btn-round" style={{width: '100%'}}>
								<a style={{display: 'block', height: '100%'}} onClick={this.handleLogin}>Login</a>
							</button>
						</div>
					</div>
					<div className="signup-section">
						<p>New here?</p>
						<button className="btn-blue-light btn-round" style={{width: '100%', marginBottom: '0pt'}}>
							<Link to="/signup/" style={{display: 'block', height: '100%'}}>Signup</Link>
						</button>
					</div>

				</div>
			</div>
		);
	}
};

LoginTooltip.propTypes = propTypes;
LoginTooltip.defaultProps = defaultProps;

export default LoginTooltip;