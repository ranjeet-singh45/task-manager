export default (sequelize, DataTypes) => {
  const Task = sequelize.define('task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
      defaultValue: 'To Do',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Task;
};
