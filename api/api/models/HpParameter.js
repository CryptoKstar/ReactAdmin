const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HpParameter', {
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(4096),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(4096),
      allowNull: false
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
