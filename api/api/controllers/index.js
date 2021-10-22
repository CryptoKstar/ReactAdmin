const models = require('../database.js');
const bcrypt = require('bcrypt');

require('../model_extend.js')(models);

for (let model in models) {
	if (models.hasOwnProperty(model)) {
		global[model] = models[model];
	}
}

const authentication = async (req, res, next) => {
	const token = req.headers.authorization || req.cookies.auth_token;
	if (token) {


		const authToken = await UserAuthToken.findOne(
			{ where: { token }, include: { model: User, as: "User" } }
		);

		if (authToken) {
			req.Auth = authToken;
		}
	}
	next();
};

const createUser = async (req, res) => {
	// try {
	const flag = await User.emailexist(req.body.Email);
	console.log(flag);
	if (flag) {
		return false;
	}
	else {
		const user = await User.create(req.body);
		return new Promise(function (resolve, reject) {
			resolve(res.status(201).json({
				user,
			}));
		})
	}
	// } catch (error) {
	// return res.status(201).json({ error: error.message })
	// }
};

const register = async (req, res) => {
	// try {
	const hash = bcrypt.hashSync(req.body.Password, 16);
	req.body = Object.assign(req.body, { Password: hash });
	const user = await createUser(req, res);
	console.log(user);
	if(!user){
		console.log("============================");
	    return res.status(201).json({ status: "exist" })
	}
	else{
		let authorization = await user.authorize();
		res.cookie("auth_token", authorization.authToken.get().Token);
		return new Promise(function (resolve, reject) {
			resolve(res.status(201).json(authorization));
		})
	}
	// }catch (error) {
	    // return res.status(201).json({ error: error.message })
	// }
};

const login = async (req, res) => {
	try {
		const { Email, Password } = req.body;
		if (!Email || !Password) {
			return res.status(400).json({ error: "Request missing Email or Password param", request_body: JSON.stringify(req.body) });
		}
		let user = await User.authenticate(Email, Password);
		if (user) {
			let authorization = await user.authorize();

			res.cookie("auth_token", authorization.authToken.get().Token);

			return res.status(201).json(authorization);
		} else {
			return res.status(400).json({ error: "Invalid Email or Password" });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

const logout = async (req, res) => {
	const { Auth } = req;

	if (Auth) {
		await User.logoutToken(Auth.get().Token);
		return res.status(201).json({ logout: true });
	}

	return res.status(201).json({ logout: false });
};

const me = async (req, res) => {
	if (req.Auth) {
		return res.status(201).json(req.Auth.User);
	}
	return res.status(201).json({});
};


module.exports = {
	register,
	login,
	logout,
	me,
	authentication
};