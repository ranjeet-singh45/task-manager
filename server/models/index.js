import Sequelize from 'sequelize';
import sequelize from '../config/db.js';
import UserModel from './user.js';
import TaskModel from './task.js';

const User = UserModel(sequelize, Sequelize.DataTypes);
const Task = TaskModel(sequelize, Sequelize.DataTypes);

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, Task };
