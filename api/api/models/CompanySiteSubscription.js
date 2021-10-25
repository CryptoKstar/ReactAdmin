const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySiteSubscription', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    company_site_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site',
        key: 'id'
      }
    },
    replace_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_subscription',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    first_charge_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_charge_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    charges: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pause: {
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
    tableName: 'company_site_subscription',
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
        name: "company_site_ref",
        using: "BTREE",
        fields: [
          { name: "company_site_id" },
        ]
      },
      {
        name: "replace_ref",
        using: "BTREE",
        fields: [
          { name: "replace_id" },
        ]
      },
    ]
  });
};
