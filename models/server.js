const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dbConfig = require('./config/db');
const routes = require('./app/routes');

const app = express();

const port = 8000;
// app config
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

MongoClient.connect(dbConfig.url, (err, database) => {
	if (err) {
		return console.log(err);
	}

	const db = database.db('vg-atlas');
	
	routes(app, db);

	app.listen(port, () => {
		console.log('Serving out of local port ' + port);
		console.log('Serving out of on host machine port 8001');
	});

});
