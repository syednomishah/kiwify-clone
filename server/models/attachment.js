'use strict';
module.exports = (sequelize, DataTypes) => {
  const attachment = sequelize.define('attachment', {

    //PostId
    
    fileName: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull:true,
      default: 'PNG'
    },
    url: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    size: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
      allowNull: true
    },
  }, {
    timestamps: false,
    paranoid: true,
    // freezeTableName: true,

    // // define the table's name
    // tableName: 'attachments',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'

  });
  attachment.associate = function(models) {
    // associations can be defined here
    const { content } = models;

    attachment.belongsTo(content);
    content.hasMany(attachment);

  };
  return attachment;
};