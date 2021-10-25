const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySiteTransaction', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    company_site_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    company_site_payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    company_site_subscription_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_subscription',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'company_site_transaction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "company_site_transaction_c",
        using: "BTREE",
        fields: [
          { name: "company_site_id" },
        ]
      },
      {
        name: "company_site_transaction_pm",
        using: "BTREE",
        fields: [
          { name: "company_site_payment_method_id" },
        ]
      },
      {
        name: "subscription_ref",
        using: "BTREE",
        fields: [
          { name: "company_site_subscription_id" },
        ]
      },
    ]
  });
};
