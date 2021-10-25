var DataTypes = require("sequelize").DataTypes;
var _Company = require("./Company");
var _CompanySite = require("./CompanySite");
var _CompanySitePaymentMethod = require("./CompanySitePaymentMethod");
var _CompanySitePaymentMethodLocale = require("./CompanySitePaymentMethodLocale");
var _CompanySiteSubscription = require("./CompanySiteSubscription");
var _CompanySiteTransaction = require("./CompanySiteTransaction");
var _HpParameter = require("./HpParameter");
var _HpPaymentMethod = require("./HpPaymentMethod");
var _HpTranslation = require("./HpTranslation");
var _Ticket = require("./Ticket");
var _TicketEntry = require("./TicketEntry");
var _User = require("./User");
var _UserAuthToken = require("./UserAuthToken");
var _UserCompany = require("./UserCompany");

function initModels(sequelize) {
  var Company = _Company(sequelize, DataTypes);
  var CompanySite = _CompanySite(sequelize, DataTypes);
  var CompanySitePaymentMethod = _CompanySitePaymentMethod(sequelize, DataTypes);
  var CompanySitePaymentMethodLocale = _CompanySitePaymentMethodLocale(sequelize, DataTypes);
  var CompanySiteSubscription = _CompanySiteSubscription(sequelize, DataTypes);
  var CompanySiteTransaction = _CompanySiteTransaction(sequelize, DataTypes);
  var HpParameter = _HpParameter(sequelize, DataTypes);
  var HpPaymentMethod = _HpPaymentMethod(sequelize, DataTypes);
  var HpTranslation = _HpTranslation(sequelize, DataTypes);
  var Ticket = _Ticket(sequelize, DataTypes);
  var TicketEntry = _TicketEntry(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserAuthToken = _UserAuthToken(sequelize, DataTypes);
  var UserCompany = _UserCompany(sequelize, DataTypes);

  CompanySite.belongsTo(Company, { as: "company", foreignKey: "company_id"});
  Company.hasMany(CompanySite, { as: "company_sites", foreignKey: "company_id"});
  UserCompany.belongsTo(Company, { as: "company", foreignKey: "company_id"});
  Company.hasMany(UserCompany, { as: "user_companies", foreignKey: "company_id"});
  CompanySitePaymentMethod.belongsTo(CompanySite, { as: "company_site", foreignKey: "company_site_id"});
  CompanySite.hasMany(CompanySitePaymentMethod, { as: "company_site_payment_methods", foreignKey: "company_site_id"});
  CompanySiteSubscription.belongsTo(CompanySite, { as: "company_site", foreignKey: "company_site_id"});
  CompanySite.hasMany(CompanySiteSubscription, { as: "company_site_subscriptions", foreignKey: "company_site_id"});
  Ticket.belongsTo(CompanySite, { as: "company_site", foreignKey: "company_site_id"});
  CompanySite.hasMany(Ticket, { as: "tickets", foreignKey: "company_site_id"});
  UserAuthToken.belongsTo(CompanySite, { as: "company_site", foreignKey: "company_site_id"});
  CompanySite.hasMany(UserAuthToken, { as: "user_auth_tokens", foreignKey: "company_site_id"});
  CompanySitePaymentMethodLocale.belongsTo(CompanySitePaymentMethod, { as: "company_site_payment_method", foreignKey: "company_site_payment_method_id"});
  CompanySitePaymentMethod.hasMany(CompanySitePaymentMethodLocale, { as: "company_site_payment_method_locales", foreignKey: "company_site_payment_method_id"});
  Ticket.belongsTo(CompanySitePaymentMethod, { as: "company_site_payment_method", foreignKey: "company_site_payment_method_id"});
  CompanySitePaymentMethod.hasMany(Ticket, { as: "tickets", foreignKey: "company_site_payment_method_id"});
  CompanySiteSubscription.belongsTo(CompanySiteSubscription, { as: "replace", foreignKey: "replace_id"});
  CompanySiteSubscription.hasMany(CompanySiteSubscription, { as: "company_site_subscriptions", foreignKey: "replace_id"});
  CompanySiteTransaction.belongsTo(CompanySiteSubscription, { as: "company_site_subscription", foreignKey: "company_site_subscription_id"});
  CompanySiteSubscription.hasMany(CompanySiteTransaction, { as: "company_site_transactions", foreignKey: "company_site_subscription_id"});
  CompanySitePaymentMethod.belongsTo(HpPaymentMethod, { as: "payment_method", foreignKey: "payment_method_id"});
  HpPaymentMethod.hasMany(CompanySitePaymentMethod, { as: "company_site_payment_methods", foreignKey: "payment_method_id"});
  TicketEntry.belongsTo(Ticket, { as: "ticket", foreignKey: "ticket_id"});
  Ticket.hasMany(TicketEntry, { as: "ticket_entries", foreignKey: "ticket_id"});
  Company.belongsTo(User, { as: "main_user", foreignKey: "main_user_id"});
  User.hasMany(Company, { as: "companies", foreignKey: "main_user_id"});
  Ticket.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(Ticket, { as: "tickets", foreignKey: "user_id"});
  TicketEntry.belongsTo(User, { as: "writer", foreignKey: "writer_id"});
  User.hasMany(TicketEntry, { as: "ticket_entries", foreignKey: "writer_id"});
  UserAuthToken.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UserAuthToken, { as: "user_auth_tokens", foreignKey: "user_id"});
  UserCompany.belongsTo(User, { as: "user", foreignKey: "user_id"});
  User.hasMany(UserCompany, { as: "user_companies", foreignKey: "user_id"});

  return {
    Company,
    CompanySite,
    CompanySitePaymentMethod,
    CompanySitePaymentMethodLocale,
    CompanySiteSubscription,
    CompanySiteTransaction,
    HpParameter,
    HpPaymentMethod,
    HpTranslation,
    Ticket,
    TicketEntry,
    User,
    UserAuthToken,
    UserCompany,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
