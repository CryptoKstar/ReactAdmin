const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TicketEntry', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    ticket_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'id'
      }
    },
    writer_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      defaultValue: ""
    },
    mail_sent_user: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mail_sent_support: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'ticket_entry',
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
        name: "ticket_ref",
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
      {
        name: "writer_ref",
        using: "BTREE",
        fields: [
          { name: "writer_id" },
        ]
      },
    ]
  });
};
