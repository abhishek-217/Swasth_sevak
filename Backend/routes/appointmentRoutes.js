const router = require('express').Router();
const Appointment = require('../models/appointments_model');

// POST - Book Appointment
router.post('/book', async (req, res) => {
    try {
        const newAppointment = new Appointment({
            doctorId: req.body.doctorId,
            patientId: req.body.patientId,
            date: req.body.date,      
            time: req.body.time,     
            doctorName: req.body.doctorName,
            doctorEmail: req.body.doctorEmail,
            patientName: req.body.patientName
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);

    } catch (err) {
        res.status(400).json({
            error: err.message,
            requiredFields: "doctorId, patientId, date(YYYY-MM-DD), time(HH:MM)"
        });
    }
});

// GET - Test endpoint
router.get('/test', (req, res) => {
    res.send("Appointment Confirmed!");
});

module.exports = router;