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

    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email, username: user.username, id: user._id },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});




// Profile Schema and Model
const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referință la utilizator
  personalDetails: {
    fullName: String,
    email: String,
    phone: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
      description: String,
      isPresent: Boolean,
    },
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
      isPresent: Boolean,
    },
  ],
  projects: [
    {
      projectName: String,
      technologies: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);


// Save Profile endpoint
app.post('/saveProfile', async (req, res) => {
  const { userId, personalDetails, education, experience, projects } = req.body;

  try {
    const profile = await Profile.findOneAndUpdate(
      { userId },
      { personalDetails, education, experience, projects },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Profile saved successfully!', profile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Error saving profile', error });
  }
});



// Endpoint pentru obținerea profilului utilizatorului
app.get('/getProfile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ userId });
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});


const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    fullName: String,
    email: String,
    phone: String,
    city: String,
    country: String,
    professionalTitle: String,
    profileImage: String,
  },
  education: [
    {
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
      description: String,
      isPresent: Boolean,
    },
  ],
  experience: [ // Asigură-te că acest câmp există și este definit corect
    {
      jobTitle: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String,
      isPresent: Boolean,
    },
  ],
  skills: [
    {
      skillName: String,
      stars: Number,
    },
  ],
  projects: [
    {
      projectName: String,
      technologies: String,
      description: String,
      link: String,
    },
  ],
  languages: [
    {
      language: String,
      stars: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Adaugă o dată de creare pentru a păstra ordinea

});

const Resume = mongoose.model('Resume', resumeSchema);



app.post('/saveResume', async (req, res) => {
  const { userId, ...resumeData } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const newResume = new Resume({
      userId,
      ...resumeData,
    });

    await newResume.save(); // Salvează un nou CV
    res.status(200).json({ message: 'Resume saved successfully', resume: newResume });
  } catch (error) {
    console.error('Error saving resume:', error);
    res.status(500).json({ message: 'Error saving resume', error });
  }
});




app.get('/getResumes/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const resumes = await Resume.find({ userId }); // Obține toate CV-urile unui utilizator
    if (resumes.length > 0) {
      res.status(200).json(resumes);
    } else {
      res.status(404).json({ message: 'No resumes found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching resumes' });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
