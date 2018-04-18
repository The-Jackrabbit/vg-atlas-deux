const UserSchema = function(req) {

	if (!req.body.username || !req.body.email || !req.body.password) {
		return {
			err: {
				err: 'An Error Has Occurred',
				reqBody: req.body,
			}
		}
	}

	return {
		username: req.body.username, 
		email: req.body.email,
		password: req.body.password,
	};
	
};

module.exports = UserSchema;