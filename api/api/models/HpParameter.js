const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('HpParameter', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    Value: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      field: 'value'
    },
    Description: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      field: 'description'
    }
  }, {
    sequelize,
    tableName: 'hp_parameter',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
