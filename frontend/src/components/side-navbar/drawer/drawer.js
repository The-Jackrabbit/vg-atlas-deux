import React, { Component } from 'react';
// Components
import { Link } from 'react-router-dom';
import './drawer.css';
class Drawer extends Component {
	constructor() {
		super();

		this.state = {
			drawerIsExpanded: false,
		};
	}
	toggleDrawer() {
		this.setState({
			drawerIsExpanded: !this.state.drawerIsExpanded,
		});
	}
	render() {
		return(
			<div className="drawer grid">
				
				<div className='main' style={{
					width: this.state.drawerIsExpanded ? '240px' : '0px',
				}}>	
				
				</div>
				
				<div className='minify grid' style={{ gridTemplateAreas: '"arrow"' }}
					onClick={() => this.toggleDrawer()}>


				</div>
				
			</div>
		);
	}
};

export default Drawer;
