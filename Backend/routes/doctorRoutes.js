
    
    const router = require('express').Router();
    const Doctor = require('../models/doctor_model');
    
    // POST - Create Doctor (Working with your exact model)
router.post('/add', async (req, res) => {
  try {
    const newDoctor = new Doctor({
      username: req.body.username,
      password: req.body.password, // Required in your model
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      specialization: req.body.specialization,
      feesPerSession: req.body.feesPerSession,
      dates: req.body.dates || [] // Handle empty slots
    });

    await newDoctor.save();
    res.status(201).json(newDoctor);
} catch (err) {
    res.status(400).json({ 
        error: err.message,
        details: "Check required: username, password | Valid: phone(10 digits), dates(YYYY-MM-DD), time(HH:MM)" 
    });
}
});


// GET - Test Connection
router.get('/test', (req, res) => {
  res.send("Doctor routes working!");
});

router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.json(doctors);
});

module.exports = router;