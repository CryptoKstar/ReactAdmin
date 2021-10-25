const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySitePaymentMethod', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    PaymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'hp_payment_method',
        key: 'id'
      },
      field: 'payment_method_id'
    },
    CompanySiteId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site',
        key: 'id'
      },
      field: 'company_site_id'
    },
    Enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'enabled'
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
    tableName: 'company_site_payment_method',
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
        name: "paymnet_method_ref",
        using: "BTREE",
        fields: [
          { name: "payment_method_id" },
        ]
      },
      {
        name: "site_ref",
        using: "BTREE",
        fields: [
          { name: "company_site_id" },
        ]
      },
    ]
  });
};
