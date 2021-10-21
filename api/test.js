const db = require("./api/database.js");


db.User.findAll({}).then(data => {
	
	console.log(data);
	
});