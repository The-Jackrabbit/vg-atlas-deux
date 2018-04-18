const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
	const collection = 'notes';

	// Read One
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectId(id),
		};
		db.collection(collection).findOne(details, (err, result) => {
			if (err) {
				res.send({
					'error': 'An Error Has Occurred',
				});
			} else {
				res.send(result);
			}
		});
	});

	// Read All
	app.get('/notes', (req, res) => {
		db.collection(collection).find({}).toArray((err, result) => {
			if (err) {
				res.send({
					'error': 'An Error Has Occurred',
				});
				next();
			} else {
				res.send(result);
			}
		});
	});
	
	// Create
	app.post('/notes', (req, res)=> {
		const note = {
			text: req.body.text, 
			title: req.body.title
		};
		db.collection(collection).insert(note, (err, result) => {
			if (err) {
				res.send({
					'error': 'An Error Has Occurred',
				});
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	// Delete
	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = {
			'_id': new ObjectId(id),
		};
		db.collection(collection).remove(details, (err, result) => {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send({message: 'Note ' + id + ' deleted!'});
			} 
		});
	});
	
	// Update
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { 
			'_id': new ObjectId(id),
		};
		const note = { 
			text: req.body.text, 
			title: req.body.title 
		};
		db.collection(collection).update(details, note, (err, result) => {
			if (err) {
				res.send({'error': 'An error has occurred'});
			} else {
				res.send(note);
			} 
		});
	});
};