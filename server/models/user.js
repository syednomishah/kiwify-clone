'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
             
    name: {
      type: DataTypes.TEXT,
      notEmpty: true,
      allowNull:false
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
    // tableName: 'users'
  });
  user.associate = function(models) {
    // associations can be defined here
    // const { City } = models;
    // user.belongsTo(City, {foreignKey: "city_id"});
    // City.hasMany(user, {foreignKey: 'city_id'});
  };
  return user;
};