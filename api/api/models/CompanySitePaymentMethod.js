const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySitePaymentMethod', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'hp_payment_method',
        key: 'id'
      }
    },
    company_site_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site',
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.BOOLEAN,
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
