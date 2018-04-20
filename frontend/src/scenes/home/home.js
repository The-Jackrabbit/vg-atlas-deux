import React from 'react';

import Navbar from '../../components/navbar/navbar';

const Home = () => {
	return (
		/*<div className="">
			<input name="username" 
				placeholder="Username" 
				value={this.state.data.username}
				onChange={(event) => this.handleInput(event, 'username')}
			/>
			<input name="email" 
				placeholder="Email" 
				value={this.state.data.email}
				onChange={(event) => this.handleInput(event, 'email')}/>
			<input name="password" 
				placeholder="Password" 
				value={this.state.data.password}
				onChange={(event) => this.handleInput(event, 'password')}/>
			<input type="submit" 
				value="Submit" onClick={this.handleSubmit}/>
			<select>
				<option>hello</option>
			</select>
		</div>*/
		<div className="page-home page">
			<Navbar></Navbar>
		</div>
	);
};

export default Home;