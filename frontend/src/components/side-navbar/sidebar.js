import React from 'react';
// Components
import { Link } from 'react-router-dom';
import Navbar from './navbar/navbar';
import Drawer from './drawer/drawer';
import './sidebar.css';

const Sidebar = () => (
	<div className='sidebar grid'>
		<div className='navbar-container'>
			<Navbar></Navbar>
		</div>
		<div className='drawer-container'>
			<Drawer context=''></Drawer>
		</div>
	</div>
	
);

export default Sidebar;
