const ObjectId = require('mongodb').ObjectId;
const UserSchema = require('../models/User');
const bcrypt = require('bcrypt');
module.exports = function(app, db) {
	const collection = 'users';
	
	// Create
	app.post('/login', (req, res) => {


		// Provided Login Info
		const providedUserInfo = { 
			username: req.body.username, 
			password: req.body.password 
		};

		// Retrieve Matching User
		const findingMatchingUser = new Promise(function(resolve, reject) {
			db.collection(collection).findOne({username : providedUserInfo.username }, (err, result) => {
				if (!result) {
					reject({error: 'No Matching user found'});
				} else {
					resolve({
						resp: 'Okay loggin you in!',
						userInfo: result,
					});
				}
			})
		});

		findingMatchingUser
		.then((response) => {
			// Now that we've found a matching user, we can check if the passwords match and make auth tokens

			const { userInfo } = response;

			const storedPassword = userInfo.password;

			bcrypt.compare(providedUserInfo.password, storedPassword, function(err, bcryptResponse) {
				if(bcryptResponse) {
					res.send({status: 'Passwords match!', resp: userInfo});
				} else {
					res.send({status: 'Passwords don\'t match :(', resp: userInfo});
				} 
			});

		})
		.catch((err) => {
			res.send({error: 'No Matching user found, not able to log you in.'});
		})

		// If no already existing user matches the info we were given

	});
};