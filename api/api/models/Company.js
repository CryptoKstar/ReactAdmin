const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Company', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    MainUserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'main_user_id'
    },
    Name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'name'
    },
    File: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'file'
    },
    Country: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'country'
    },
    Address: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'address'
    },
    RegNo: {
      type: DataTypes.STRING(128),
      allowNull: true,
      field: 'reg_no'
    },
    TaxNo: {
      type: DataTypes.STRING(128),
      allowNull: true,
      field: 'tax_no'
    },
    Suspended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'suspended'
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
    tableName: 'company',
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
        name: "main_user_ref",
        using: "BTREE",
        fields: [
          { name: "main_user_id" },
        ]
      },
    ]
  });
};
