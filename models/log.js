module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    command: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    system_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lock_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    door_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
};
