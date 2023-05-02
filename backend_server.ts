import express from 'express';
import mysql from 'mysql2';
import pg from 'pg';
import { Sequelize } from 'sequelize';
import { PrismaClient } from '@prisma/client';

// Initialize express
const app = express();

// Create a MySQL connection pool
const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create a PostgreSQL client
const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'password',
  port: 5432,
});

// Create a Prisma client instance
const prisma = new PrismaClient();

// Create a Sequelize instance
const sequelize = new Sequelize('mydatabase', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Set up the express app
app.use(express.json());

// Define your routes and middleware here

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


