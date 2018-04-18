const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
let db = require('./config/db');

const app = express();

const port = 8000;
// app config
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

MongoClient.connect(db.url, (err, database) => {
	if (err) {
		return console.log(err);
	}

	db = database.db('vg-atlas');
	require('./app/routes')(app, db);

	app.listen(port, () => {
		console.log('Serving out of port ' + port);
	});

});
