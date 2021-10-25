const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CompanySite', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'url'
    },
    Urls: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      field: 'urls'
    },
    CompanyId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'company',
        key: 'id'
      },
      field: 'company_id'
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
    tableName: 'company_site',
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
        name: "company_ref",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};
