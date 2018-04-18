const noteRoutes = require('./noteRoutes');

module.exports = function(app, db) {
	
	noteRoutes(app, db);
};