import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Role } from '../models/models';

const app = express();
const saltRounds = 10; // number of rounds to use for bcrypt password hashing

// set up middleware to parse request bodies as JSON
app.use(bodyParser.json());

// endpoint for registering a new user
app.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, companyName } = req.body;

    // hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // create a new user record in the database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      companyName,
      role: Role.USER, // set the user's role to the default value for new users
      isEmailConfirmed: false, // mark the user as unconfirmed until they confirm their email
    });

    // TODO: send an email to the user with a link to confirm their email address

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to register user' });
  }
});

// endpoint for confirming a user's email address
app.get('/confirm-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // verify the token to ensure it hasn't been tampered with
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // update the user record in the database to mark the email as confirmed
    await User.update(
      { isEmailConfirmed: true },
      { where: { id: decodedToken.userId } }
    );

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to confirm email address' });
  }
});

// endpoint for changing a user's password
app.post('/change-password', async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    // fetch the user record from the database
    const user = await User.findOne({ where: { email } });

    // check that the current password matches the one in the database
    const passwordMatches = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // hash the new password before saving it to the database
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // update the user record in the database with the new password
    await User.update(
      { password: hashedNewPassword },
      { where: { id: user.id } }
    );

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to change password' });
  }
});