const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySiteSubscription', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Uid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'uid'
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
    ReplaceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company_site_subscription',
        key: 'id'
      },
      field: 'replace_id'
    },
    Name: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'name'
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      field: 'amount'
    },
    FirstChargeAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'first_charge_at'
    },
    LastChargeAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_charge_at'
    },
    Charges: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'charges'
    },
    Pause: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'pause'
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
