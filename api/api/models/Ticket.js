const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ticket', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
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
    company_site_payment_method_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_payment_method',
        key: 'id'
      }
    },
    alt_email: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: ""
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    disable: {
      type: DataTypes.BOOLEAN,
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
