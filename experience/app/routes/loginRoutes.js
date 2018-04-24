const ObjectId = require('mongodb').ObjectId;
const fetch  = require('node-fetch');

module.exports = function(app, db) {
	const collection = 'users';

	// Create
	app.post('/login', (req, res)=> {
		const loginInfo = {
			username: req.body.username, 
			password: req.body.password,
		};
		const url = 'http://models-api:8000/login';

		fetch(url, {
			body: JSON.stringify(loginInfo), // must match 'Content-Type' header
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
			res.send({
				...data,
			});
		}).catch((err) => {
			res.send({
				code: 400,
				message: 'An error has occurred, couldn\'t reach the models layers',
				error: [
					{...err}
				]
			});
		});
	});
};