const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

module.exports = function(app, db) {
	userRoutes(app, db);
	noteRoutes(app, db);
	loginRoutes(app, db);

};