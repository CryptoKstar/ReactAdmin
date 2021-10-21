const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HpTranslation', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    Language: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'language'
    },
    Text: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      field: 'text'
    },
    Translation: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      field: 'translation'
    }
  }, {
    sequelize,
    tableName: 'hp_translation',
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
