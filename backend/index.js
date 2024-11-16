const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Exemplu de endpoint
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to ByteResume API!' });
});

// Pornire server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
