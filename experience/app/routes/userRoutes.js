const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
	const collection = 'users';

	const UserSchema = (req) => {

		if (req.body.username && req.body.email && req.body.password) {

			return {
				username: req.body.username, 
				email: req.body.email,
				password: req.body.password,
			};

		}
		return {
			err: {
				err: 'An Error Has Occufffrred',
				reqBody: req.body,
			}
		}
		
	};

	// Read One
	app.get('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectId(id),
		};
		db.collection(collection).findOne(details, (err, result) => {
			if (err) {
				res.send({
					error: 'An Error Has Occurred',
					report: err,
				});
			} else {
				res.send(result);
			}
		});
	});

	// Read All
	app.get('/users', (req, res) => {
		db.collection(collection).find({}).toArray((err, result) => {
			if (err) {
				res.send({
					error: 'An Error Has Occurred',
					report: err,
				});
			} else {
				res.send(result);
			}
		});
	});
	
	// Create
	app.post('/users', (req, res) => {
		const user = UserSchema(req);
		if (user.err) {
			res.send({error: 'An error has occurred', report: user.err,});
		} else {
			db.collection(collection).insert(user, (err, result) => {
				if (err) {
					res.send({
						error: 'An Error Has Occurred',
						report: err,
					});
				} else {
					res.send(result.ops[0]);
				}
			});
		}
	});

	// Delete
	app.delete('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectId(id),
		};
		db.collection(collection).remove(details, (err, result) => {
			if (err) {
				res.send({error:'An error has occurred', report: err,});
			} else {
				res.send({message: 'User ' + id + ' deleted!'});
			} 
		});
	});
	
	// Update
	app.put('/users/:id', (req, res) => {
		const id = req.params.id;
		const details = { 
			'_id': new ObjectId(id),
		};
		const user = UserSchema(req);
		if (user.err) {
			res.send({error: 'An error has occurred', report: user.err,});
		} else {
			db.collection(collection).update(details, user, (err, result) => {
				if (err) {
					res.send({error: 'An error has occurred', report: err,});
				} else {
					res.send(note);
				} 
			});
		}
	});

};