import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'mysql', // or 'postgres'
  database: 'your-database-name',
  username: 'your-username',
  password: 'your-password',
  host: 'localhost',
  port: 3306, // or 5432 for postgres
});

// Define the users table schema
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'finance', 'user'),
    allowNull: false,
    defaultValue: 'user',
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Sync the schema with the database
User.sync();

export { sequelize, User };
