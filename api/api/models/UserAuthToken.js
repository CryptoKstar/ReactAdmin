const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserAuthToken', {
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
    Token: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      field: 'token'
    },
    RestrictTo: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'restrict_to'
    },
    ExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at'
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
    tableName: 'user_auth_token',
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
        name: "user_auth_token_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "site_auth_ref",
        using: "BTREE",
        fields: [
          { name: "company_site_id" },
        ]
      },
    ]
  });
};
