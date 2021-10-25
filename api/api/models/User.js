const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      field: 'email'
    },
    Password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'password'
    },
    Name: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: "",
      field: 'name'
    },
    Tel: {
      type: DataTypes.STRING(128),
      allowNull: true,
      field: 'tel'
    },
    Data: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'data'
    },
    Suspended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'suspended'
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
    tableName: 'user',
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
    ]
  });
};
