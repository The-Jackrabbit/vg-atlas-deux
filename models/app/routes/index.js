const noteRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');

module.exports = function(app, db) {
	userRoutes(app, db);
	noteRoutes(app, db);
	loginRoutes(app, db);
	signupRoutes(app, db);

};