import React from 'react';
import './navbar.css';
// Components
import { Link } from 'react-router-dom';
// import octicons from 'octicons'; // <-- use this to get svg code for new icons
import { MiniLogoIcon, HomeIcon, SettingsIcon, LocationIcon, PersonIcon, SearchIcon } from '../../Icons/octicons';

const Navbar = () => (
	<div className="navbar grid">
		<div className="logo">
			<Link to='/'>
				<MiniLogoIcon
					height='28pt'
					width= '28pt'>
				</MiniLogoIcon>
			</Link>
		</div>
		<div className="search">
			<Link to='/search/'>
				<SearchIcon></SearchIcon>
			</Link>
			
		</div>
		<div className="atlas">
			<Link to='/atlas/'>
				<LocationIcon></LocationIcon>
			</Link>
		</div>
		<div className="profile">
			<Link to='/signup/'>
				<PersonIcon></PersonIcon>
			</Link>
		</div>
		<div className="settings">
			<Link to='/settings/'>
				<SettingsIcon></SettingsIcon>
			</Link>
		</div>
	</div>
);

export default Navbar;
