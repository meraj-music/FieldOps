const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows cross-origin requests from our frontend
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.get('/', (req, res) => {
    res.send('Project Tracker API is running!');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/initiatives', require('./routes/initiatives'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/search', require('./routes/search'));
app.use('/api/partners', require('./routes/partners'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));