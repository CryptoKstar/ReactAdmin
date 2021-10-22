require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser')
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const PORT = process.env.APP_PORT || 4080;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes.authentication);

// app.use(function(req, res, next) {
// 	res.header('Access-Control-Allow-Headers', "*");
// 	res.header('Access-Control-Allow-Origin', "*");
// 	res.header('Access-Control-Allow-Methods', "*");
// 	next();
// });
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Headers', "*");
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', "*");
	next();
});

app.use('/', routes);

if(routes.uses){
	routes.uses.forEach((use) => {
		app.use(use);
	});
}


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
//node_modules/.bin/sequelize-auto -o "./api/models" -d holestpay -h localhost -u holestpay -p 3306 -x Le0dailyhoroscop-E -e mysql --caseModel p --caseFile p --caseProp o
//find api/models -name \*.js -exec sed -i "s/ Id:/ id:/g" {} \;
