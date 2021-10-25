const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySitePaymentMethodLocale', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    CompanySitePaymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_payment_method',
        key: 'id'
      },
      field: 'company_site_payment_method_id'
    },
    Languange: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'languange'
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
