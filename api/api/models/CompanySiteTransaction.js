const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySiteTransaction', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CompanySiteId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'company_site_id'
    },
    CompanySitePaymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'company_site_payment_method_id'
    },
    Type: {
      type: DataTypes.STRING(128),
      allowNull: true,
      field: 'type'
    },
    Status: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'status'
    },
    Data: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'data'
    },
    Deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'deleted'
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updated_at'
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
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
    ]
  });
};
