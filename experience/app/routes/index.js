const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');
const signupRoutes = require('./signupRoutes');

module.exports = function(app, db) {
	userRoutes(app, db);
	noteRoutes(app, db);
	signupRoutes(app, db);
};