const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ticket', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'user_id'
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
    CompanySitePaymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_payment_method',
        key: 'id'
      },
      field: 'company_site_payment_method_id'
    },
    AltEmail: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'alt_email'
    },
    Title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: "",
      field: 'title'
    },
    Closed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'closed'
    },
    Disable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'disable'
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
    tableName: 'ticket',
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
        name: "ticket_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "ticket_site",
        using: "BTREE",
        fields: [
          { name: "company_site_id" },
        ]
      },
      {
        name: "ticket_method",
        using: "BTREE",
        fields: [
          { name: "company_site_payment_method_id" },
        ]
      },
    ]
  });
};
