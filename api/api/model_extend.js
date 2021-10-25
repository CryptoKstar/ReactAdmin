const bcrypt = require('bcrypt');

module.exports = function(models){
	
	models.User.belongsToMany(models.Company, { through: models.UserCompany,uniqueKey: "UserId"});
	models.Company.belongsToMany(models.User, { through: models.UserCompany,uniqueKey: "CompanyId"});

	models.User.prototype.toJSON = function () {
	  var values = Object.assign({}, this.get());
	  delete values.Password;
	  return values;
	};
	
	for(var modelName in models){
		if(modelName === "User")
			continue;
		if(models.hasOwnProperty(modelName)){
			
		}
	}
	
	models.User.prototype.authorize = async function () {
		//const { AuthToken } = sequelize.models;
		console.log("=================================")
		const user = this.get();
		const authToken = await models.UserAuthToken.generateUserToken(user.id);
		await this.addUserAuthToken(authToken);
		return { user: this, authToken };
	};
	
	models.User.prototype.authorizeSite = async function (CompanySiteId, RestrictTo) {
		//const { AuthToken } = sequelize.models;
		const user = this.get();
		const authToken = await models.UserAuthToken.generateServiceToken(user.id);
		await this.addUserAuthToken(authToken);
		return { user: this, authToken };
	};
	
	models.User.authenticate = async function(email, password) {
		const user = await models.User.findOne({ where: { email } });
		if (user && bcrypt.compareSync(password, user.get().password)) {
		    return user;
		}else
			return false;
	};
	
	models.User.emailexist = async function(email) {
		const user = await models.User.findOne({ where: { email } });
		if (user) {
		    return true;
		}else
			return false;
	};

	models.User.logoutToken = async function (token) {
		models.UserAuthToken.destroy({ where: { token } });
	};
	
	models.UserAuthToken.generateUserToken = async function(UserId) {
		
		if (!UserId) {
		  throw new Error('AuthToken requires a user ID (' + (UserId || "") + ")");
		}

		let Token = '';

		const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		  'abcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < 32; i++) {
		  Token += possibleCharacters.charAt(
			Math.floor(Math.random() * possibleCharacters.length)
		  );
		}

		return models.UserAuthToken.create({ Token, UserId });
	};
	
	models.UserAuthToken.generateServiceToken = async function(UserId, CompanySiteId, RestrictTo) {
		if (!UserId) {
		  throw new Error('AuthToken requires a user ID')
		}
		
		if(!CompanySiteId)
			CompanySiteId = null;
		
		if(!RestrictTo)
			RestrictTo = null;

		let Token = '';

		const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		  'abcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < 32; i++) {
		  Token += possibleCharacters.charAt(
			Math.floor(Math.random() * possibleCharacters.length)
		  );
		}

		return models.UserAuthToken.create({ Token, UserId, CompanySiteId, RestrictTo });
	};
	
	
	
};