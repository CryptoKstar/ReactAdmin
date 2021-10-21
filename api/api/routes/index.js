const {crud, sequelizeCrud} = require('express-sequelize-crud');

const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();
const { Op } = require("sequelize");

router.authentication = controllers.authentication;

router.get('/', (req, res) => res.send('HOLESTPAY'));
router.get('/api', (req, res) => res.send('API ROOT'));

router.post('/login', controllers.login);
router.delete('/logout', controllers.logout);
router.post('/logout', controllers.logout);
router.post('/register', controllers.register);
router.get('/me', controllers.me);


/*
	models.Company
	models.CompanySiteSubscription
	models.HpTranslation
	models.UserAuthToken
	models.CompanySite
	models.CompanySiteTransaction
	models.UserCompany
	models.CompanySitePaymentMethod
	models.HpParameter
	models.TicketEntry
	models.User
	models.CompanySitePaymentMethodLocale
	models.HpPaymentMethod
	models.Ticket
*/



UserCompany.userscope = {};
UserCompany.addScope("userscope", function(user){
	if(!user){
		return {
			where:{
				UserId: -1
			}
		}
	}else{
		return {
			where:{
				UserId: user.get().id
			},
			include:[
				{model: Company, as: "Company"}
			]
		}
	}
});

Company.userscope = {};
Company.addScope("userscope", function(user){
	if(!user){
		return {
			where:{
				id: -1
			}
		}
	}else{
		return {
			where:{
				//
			},
			include:[
				{model: User, as:"MainUser", attributes: {exclude: ['Password']}},
				{model: UserCompany, as: "UserCompanies", where:{"user_id":user.get().id}}
			]
		}
	}
});

CompanySite.userscope = {};
CompanySite.addScope("userscope", function(user){
	if(!user){
		return {
			where:{
				id: -1
			}
		}
	}else{
		return {
			include:[
			    {model: Company, as: "Company", include:[  
					{model: UserCompany, as: "UserCompanies", where:{"user_id":user.get().id}}
				]}
			]
		}
	}
});


CompanySitePaymentMethod.userscope = {sites:1};
CompanySitePaymentMethod.addScope("userscope", function(user, sites){
	if(!user){
		return {
			where:{
				id: -1
			}
		}
	}else{
		return {
			include:[
				{model: CompanySitePaymentMethodLocale, as: "CompanySitePaymentMethodLocales"}
			],
			where: {
				CompanySiteId:{
					[Op.in]: sites
				}
			}
		}
	}
});

CompanySiteSubscription.userscope = {sites:1};
CompanySiteSubscription.addScope("userscope", function(user, sites){
	if(!user){
		return {
			where:{
				id: -1
			}
		}
	}else{
		return {
			where: {
				CompanySiteId:{
					[Op.in]: sites
				}
			}
		}
	}
});

CompanySiteTransaction.userscope = {sites:1};
CompanySiteTransaction.addScope("userscope", function(user, sites){
	if(!user){
		return {
			where:{
				id: -1
			}
		}
	}else{
		return {
			where: {
				CompanySiteId:{
					[Op.in]: sites
				}
			}
		}
	}
});

function secure(router){
	router.stack.filter((h) => h.route).forEach(function(l){
		l.__hp_handle = l.handle;
		
		l.handle = (req,res,next) => {
			if(!req.Auth){
				return res.status(401).json({error: "401 Unauthorized"});
			}
			global.current_auth = req.Auth;	
			return l.__hp_handle(req,res,next);
		};
	});
	return router;
};

function currentUser(){
	if(!global.current_auth)
		return null;
	
	return global.current_auth.User;
}

function createCRUD(model, readonly){
	
	let c = {};
	
	c.getOne = async (id) => {
		return model.findByPk(id)
	};
	
	c.getList = async ({ filter, limit, offset, order }) => {
		
	  if(model.userscope){
		  
		  const u = currentUser();
		  
		  let sites = null;
		  if(model.userscope.sites){
			 sites = (await model.sequelize.query(` SELECT 
														company_site.id 
													FROM 
														user_company
													RIGHT OUTER JOIN 
														company_site on user_company.company_id = company_site.company_id
													WHERE 
														user_company.user_id = ${u.get().id}`, { type: model.sequelize.QueryTypes.SELECT })).map((s) => s.id);
		  }
		  
		  return model.scope({ method: [ "userscope", u , sites] }).findAndCountAll({
			limit,
			offset,
			order,
			where: filter
		  });
		  
	  }else{	
		  return model.findAndCountAll({
			limit,
			offset,
			order,
			where: filter
		  });
	  }
	  
    };
	
	if(!readonly){
		c.create = async (body) => {
			return model.create(body)
		};
	
		c.update = async (id, body) => {
		  const record = await model.findByPk(id)
		  if (!record) {
			throw new Error('Record not found')
		  }
		  return record.update(body)
		};
	
		c.destroy = async (id) => {
		  const record = await model.findByPk(id)
		  if (!record) {
			throw new Error('Record not found')
		  }
		  await record.destroy()
		  return { id }
		};
	}
	return c;
}


router.uses = [
	secure(crud('/api/user_companies', createCRUD(UserCompany))),
	secure(crud('/api/companies', createCRUD(Company))),
	secure(crud('/api/company_sites', createCRUD(CompanySite))),
	secure(crud('/api/company_site_payment_methods', createCRUD(CompanySitePaymentMethod))),
	secure(crud('/api/company_site_subscriptions', createCRUD(CompanySiteSubscription))),
	secure(crud('/api/company_site_transactions', createCRUD(CompanySiteTransaction))),
	secure(crud('/api/payment_methods', createCRUD(HpPaymentMethod,true))),
	secure(crud('/api/translation', createCRUD(HpTranslation,true))),
	secure(crud('/api/tickets', createCRUD(Ticket)))	
];

module.exports = router