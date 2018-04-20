import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import Assets
import './navbar.css';
import logo from '../../assets/logo.svg';
import loginCaret from '../../assets/loginCaret.svg';
// Components
import { Link } from 'react-router-dom';
import LoginTooltip from './LoginTooltip/loginTooltip';

const propTypes = {
	links: PropTypes.array,
};
const defaultProps = {
	links: [
		{label: 'Home', link: '/home/'},
		{label: 'Games', link: '/games/'},
		{label: 'Library', link: '/library/'},
	],
};

class Navbar extends Component {
	constructor() {
		super();

		this.state = {
			mouseOverTooltip: false,
			loginCardEngaged: false,
		};

		this.toggleLoginCard = this.toggleLoginCard.bind(this);
		this.handleMouseOverTooltip = this.handleMouseOverTooltip.bind(this);
		this.handleInputFocus = this.handleInputFocus.bind(this);
		this.handleDocumentClick = this.handleDocumentClick.bind(this);
	}

	componentWillMount(){
		document.addEventListener('click', this.handleDocumentClick, false);
	}  

	handleDocumentClick() {
		if (!this.state.mouseOverTooltip) {
			this.setState({
				loginCardEngaged: false,
			});
		}
	}

	toggleLoginCard() {
		console.log('clickin');
		if (this.state.mouseOverTooltip || this.state.loginCardEngaged) {
			this.setState({
				loginCardEngaged: false,
			});
		} else {
			this.setState({
				loginCardEngaged: true,
			});
		}
		
	}

	handleMouseOverTooltip(event, isOver) {
		this.setState({
			mouseOverTooltip: isOver,
		});
	}

	handleInputFocus(event, isFocused) {
		this.setState({
			loginCardEngaged: isFocused,
		});
	}

	render() {
		return (
			<div className="nav-container">
				<div className="nav">
					<div className="links">
						<Link to="/home/">Home</Link>
						<Link to="/games/">Games</Link>
						<Link to="/library/">Library</Link>
					</div>
					<div className="logo" >
						<img src={logo} alt="vg-atlas logo"/>
					</div>
					<div className="login">
						<span onClick={this.toggleLoginCard}> Login <img src={loginCaret} id="login-caret" alt="login-caret"/></span>
						<div 
							onMouseOver={(event) => this.handleMouseOverTooltip(event, true)}
							onMouseLeave={(event) => this.handleMouseOverTooltip(event, false)}>

							<LoginTooltip handleInputFocus={this.handleInputFocus}
								visibility = {
									this.state.mouseOverTooltip || this.state.loginCardEngaged
										? 'visible'
										: 'hidden'
								}>
							</LoginTooltip>

						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;