import { User } from './models/models';
import express, { Request, Response } from 'express';
import mysql from 'mysql2';

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name',
});

app.use(express.json());

// Admin login (POST request with email and password)
app.post('/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ? AND password = ? AND role = 'admin'`;

  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      // Return admin dashboard after successful login
      res.send('Admin dashboard');
    }
  });
});

// Admin dashboard (GET request after successful login)
app.get('/admin/dashboard', (req: Request, res: Response) => {
  res.send('Admin dashboard');
});

// Admin register users (POST request with user details)
app.post('/admin/register', (req: Request, res: Response) => {
  const { firstName, lastName, password, email, phoneNumber, role, photo, companyName } = req.body;
  const sql = `INSERT INTO users (firstName, lastName, password, email, phoneNumber, role, photo, companyName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [firstName, lastName, password, email, phoneNumber, role, photo, companyName], (error, results) => {
    if (error) {
      throw error;
    }

    res.send('User registered successfully');
  });
});

// User login (POST request with email and password)
app.post('/user/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ? AND password = ? AND role = 'user'`;

  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      // Return user dashboard after successful login
      res.send('User dashboard');
    }
  });
});

// User dashboard (GET request after successful login)
app.get('/user/dashboard', (req: Request, res: Response) => {
  res.send('User dashboard');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
