const router = require('express').Router();
const Patient = require('../models/patient_model');

// GET all patients (testing only)
router.get('/', (req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST new patient
router.post('/add', (req, res) => {
    const { googleId, email, name, picture } = req.body;
    
    const newPatient = new Patient({ googleId, email, name, picture });
    
    newPatient.save()
        .then(() => res.json('Patient added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT update phone number
router.put('/:id/phone', (req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.phoneNumber = req.body.phoneNumber;
            
            patient.save()
                .then(() => res.json('Phone number updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;