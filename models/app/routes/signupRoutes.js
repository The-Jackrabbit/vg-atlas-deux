const ObjectId = require('mongodb').ObjectId;
const UserSchema = require('../models/User');
const bcrypt = require('bcrypt');
module.exports = function(app, db) {
	const collection = 'users';
	
	// Create
	app.post('/signup', (req, res) => {

		// Provided Login Info
		const providedUserInfo = { 
			username: req.body.username, 
			email: req.body.email,
			password: req.body.password 
		};

		// Retrieve Matching User
		const findingMatchingUser = new Promise(function(resolve, reject) {
			db.collection(collection).findOne({username : providedUserInfo.username }, (err, result) => {
				if (!result) {
					resolve({
						resp: 'No user found! You can use this one!',
						userInfo: result,
					});
				} else {
					reject({
						code: 409,
						message: 'This username is taken, please try another'
					});
				}
			})
		});

		findingMatchingUser
		.then((response) => {
			// Now that we've found a matching user, we can check if the passwords match and make auth tokens
			const { userInfo } = response;
			providedUserInfo.password = bcrypt.hashSync(providedUserInfo.password, 10);
			db.collection(collection).insert(providedUserInfo, (err, result) => {
				if (err) {
					res.send({
						code: 400,
						message: 'There was an error inserting the user information',
						errors: [
							{...err}
						]
					});
				} else {
					res.send({
						code: 201,
						message: 'User successfully created!',
						result: {
							...result.ops[0]
						}						
					});
				}
			});

		})
		.catch((err) => {
			res.send({
				code: 409,
				message: 'There was an error inserting the user information',
				errors: [
					{...err}
				]
			});
		})

		// If no already existing user matches the info we were given

	});
};