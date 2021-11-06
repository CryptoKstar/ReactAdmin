require('dotenv').config(); 
const express = require('express');
const cookieParser = require('cookie-parser')
const routes = require('./api/routes');
const bodyParser = require('body-parser');
var multer = require('multer');
const path = require("path");
var cors = require('cors');

const PORT = process.env.APP_PORT || 4080;
const app = express();

app.use(cookieParser());
app.use(cors())
app.use(bodyParser.json());
app.use(routes.authentication);
app.use(express.static(path.join(__dirname, "public")));
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

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	cb(null, 'public')
  },
  filename: function (req, file, cb) {
	  console.log(file)
	cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
//node_modules/.bin/sequelize-auto -o "./api/models" -d holestpay -h localhost -u holestpay -p 3306 -x Le0dailyhoroscop-E -e mysql --caseModel p --caseFile p --caseProp o
//find api/models -name \*.js -exec sed -i "s/ Id:/ id:/g" {} \;
