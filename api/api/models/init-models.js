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

  CompanySite.belongsTo(Company, { as: "Company", foreignKey: "CompanyId"});
  Company.hasMany(CompanySite, { as: "CompanySites", foreignKey: "CompanyId"});
  UserCompany.belongsTo(Company, { as: "Company", foreignKey: "CompanyId"});
  Company.hasMany(UserCompany, { as: "UserCompanies", foreignKey: "CompanyId"});
  CompanySitePaymentMethod.belongsTo(CompanySite, { as: "CompanySite", foreignKey: "CompanySiteId"});
  CompanySite.hasMany(CompanySitePaymentMethod, { as: "CompanySitePaymentMethods", foreignKey: "CompanySiteId"});
  CompanySiteSubscription.belongsTo(CompanySite, { as: "CompanySite", foreignKey: "CompanySiteId"});
  CompanySite.hasMany(CompanySiteSubscription, { as: "CompanySiteSubscriptions", foreignKey: "CompanySiteId"});
  Ticket.belongsTo(CompanySite, { as: "CompanySite", foreignKey: "CompanySiteId"});
  CompanySite.hasMany(Ticket, { as: "Tickets", foreignKey: "CompanySiteId"});
  UserAuthToken.belongsTo(CompanySite, { as: "CompanySite", foreignKey: "CompanySiteId"});
  CompanySite.hasMany(UserAuthToken, { as: "UserAuthTokens", foreignKey: "CompanySiteId"});
  CompanySitePaymentMethodLocale.belongsTo(CompanySitePaymentMethod, { as: "CompanySitePaymentMethod", foreignKey: "CompanySitePaymentMethodId"});
  CompanySitePaymentMethod.hasMany(CompanySitePaymentMethodLocale, { as: "CompanySitePaymentMethodLocales", foreignKey: "CompanySitePaymentMethodId"});
  Ticket.belongsTo(CompanySitePaymentMethod, { as: "CompanySitePaymentMethod", foreignKey: "CompanySitePaymentMethodId"});
  CompanySitePaymentMethod.hasMany(Ticket, { as: "Tickets", foreignKey: "CompanySitePaymentMethodId"});
  CompanySiteSubscription.belongsTo(CompanySiteSubscription, { as: "Replace", foreignKey: "ReplaceId"});
  CompanySiteSubscription.hasMany(CompanySiteSubscription, { as: "CompanySiteSubscriptions", foreignKey: "ReplaceId"});
  CompanySitePaymentMethod.belongsTo(HpPaymentMethod, { as: "PaymentMethod", foreignKey: "PaymentMethodId"});
  HpPaymentMethod.hasMany(CompanySitePaymentMethod, { as: "CompanySitePaymentMethods", foreignKey: "PaymentMethodId"});
  TicketEntry.belongsTo(Ticket, { as: "Ticket", foreignKey: "TicketId"});
  Ticket.hasMany(TicketEntry, { as: "TicketEntries", foreignKey: "TicketId"});
  Company.belongsTo(User, { as: "MainUser", foreignKey: "MainUserId"});
  User.hasMany(Company, { as: "Companies", foreignKey: "MainUserId"});
  Ticket.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(Ticket, { as: "Tickets", foreignKey: "UserId"});
  TicketEntry.belongsTo(User, { as: "Writer", foreignKey: "WriterId"});
  User.hasMany(TicketEntry, { as: "TicketEntries", foreignKey: "WriterId"});
  UserAuthToken.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(UserAuthToken, { as: "UserAuthTokens", foreignKey: "UserId"});
  UserCompany.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(UserCompany, { as: "UserCompanies", foreignKey: "UserId"});

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
