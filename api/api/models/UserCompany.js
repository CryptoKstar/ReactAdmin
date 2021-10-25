const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserCompany', {
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
    CompanyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'company',
        key: 'id'
      },
      field: 'company_id'
    },
    Role: {
      type: DataTypes.STRING(128),
      allowNull: false,
      field: 'role'
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
    tableName: 'user_company',
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
        name: "user_company_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_company_company",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};
