const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/byteResumeDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  jobTitle: String,
  firstName: String,
  lastName: String,
  username: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Test endpoint
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to ByteResume API!' });
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { jobTitle, firstName, lastName, username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      jobTitle,
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'Email already exists!' });
    } else {
      res.status(500).send({ message: 'Server error' });
    }
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user: { email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
