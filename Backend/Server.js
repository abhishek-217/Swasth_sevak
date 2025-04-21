const express = require('express');
const cors = require('cors');
const connectDB = require('./DB'); // Import connection from DB.js
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection (handled in DB.js)
connectDB(); 

// Routes
app.use('/patients', require('./routes/patientRoutes'));
app.use('/doctors', require('./routes/doctorRoutes'));
app.use('/appointments', require('./routes/appointmentRoutes'));

// Health Check
app.get('/', (req, res) => res.send('Hospital API Running'));

// Start Server
const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));