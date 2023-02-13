"use strict";
module.exports = (sequelize, DataTypes) => {
  const module = sequelize.define(
    "module",
    {
      name: {
        type: DataTypes.TEXT,
        notEmpty: true,
        allowNull: false,
      },
      created: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        allowNull: true
      },
      // userId, 
    },
    {
      timestamps: false,
      paranoid: true,
      // freezeTableName: true,

      // // define the table's name
      // tableName: 'modules'
    }
  );
  module.associate = function (models) {
    // associations can be defined here
    const { user, location } = models;

    module.belongsTo(user);
    user.hasMany(module);
  };
  return module;
};
