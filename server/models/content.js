"use strict";
module.exports = (sequelize, DataTypes) => {
  const content = sequelize.define(
    "content",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      video: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: true
      },
    },
    {
      timestamps: false,
      paranoid: true
    }
  );
  content.associate = function (models) {
    // associations can be defined here
    const { module } = models;

    content.belongsTo(module);
    module.hasMany(content);
  };
  return content;
};
