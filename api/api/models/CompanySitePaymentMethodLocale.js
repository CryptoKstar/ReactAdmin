const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySitePaymentMethodLocale', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    company_site_payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_payment_method',
        key: 'id'
      }
    },
    languange: {
      type: DataTypes.STRING(128),
      allowNull: false
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
    tableName: 'company_site_payment_method_locale',
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
        name: "csp_ref",
        using: "BTREE",
        fields: [
          { name: "company_site_payment_method_id" },
        ]
      },
    ]
  });
};
