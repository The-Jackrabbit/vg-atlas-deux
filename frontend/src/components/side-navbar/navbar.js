import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.svg';
import loginCaret from '../../assets/loginCaret.svg';
// Components
import { Link } from 'react-router-dom';
// import octicons from 'octicons'; // <-- use this to get svg code for new icons
import { MiniLogoIcon, HomeIcon, SettingsIcon, LocationIcon, PersonIcon, SearchIcon } from '../Icons/octicons';

const Navbar = () => (
	<div className="nav grid">
		<div className="logo">
			<MiniLogoIcon
				height='28pt'
				width= '28pt'>
			</MiniLogoIcon>
		</div>
		<div className="home">
			<HomeIcon></HomeIcon>
		</div>
		<div className="search">
			<SearchIcon></SearchIcon>
		</div>
		<div className="atlas">
			<LocationIcon></LocationIcon>
		</div>
		<div className="profile">
			<PersonIcon></PersonIcon>
		</div>
		<div className="settings">
			<SettingsIcon></SettingsIcon>
		</div>
	</div>
);

export default Navbar;
