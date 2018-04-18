import React, { Component } from 'react';

class App extends Component {
	constructor() {
		super();

		this.state = {
			data: {
				username: 'james',
				email: 'james@bg.com',
				password: '12345',
			},
		};

		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleSubmit() {
		const url = 'http://localhost:8000/users/';
		
		if (this.state.data.username.length > 0 
			&& this.state.data.email.length > 0
			&& this.state.data.password.length > 0) {
			
			this.setState({
				isLoading: true,
			});

			fetch(url, {
				body: JSON.stringify(this.state.data), // must match 'Content-Type' header
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, same-origin, *omit
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // *client, no-referrer
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.setState({
					data: {
						username: '',
						email: '',
						password: '',
					},
					isLoading: false,
				});
			});
		}
	}

	handleInput(event, field) {
		const input = event.target.value;
		this.setState({
			data: {
				...this.state.data,
				[field]: input, 
			},
		});
	}

	render() {
		return (
			<div className="">
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
			</div>
		);
	}
}

export default App;
