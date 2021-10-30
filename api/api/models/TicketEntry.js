const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TicketEntry', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    TicketId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'id'
      },
      field: 'ticket_id'
    },
    WriterId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      },
      field: 'writer_id'
    },
    Content: {
      type: DataTypes.STRING(4096),
      allowNull: false,
      defaultValue: "",
      field: 'content'
    },
    MailSentUser: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'mail_sent_user'
    },
    MailSentSupport: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'mail_sent_support'
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
