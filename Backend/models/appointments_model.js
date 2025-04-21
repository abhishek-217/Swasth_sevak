const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    given: { type: Boolean, default: false },
    stars: { type: Number, default: 0, min: 0, max: 5 },
    title: { type: String, trim: true, maxlength: 100, default: "" },
    review: { type: String, trim: true, maxlength: 500, default: "" }
}, { _id: false });


const appointmentSchema = new mongoose.Schema({
    doctorId: { type: String, required: true },
    patientId: { type: String, required: true },
    date: { 
        type: String, 
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD validation
    },
    time: {  // Changed from slotTime to time
        type: String, 
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM validation
    },
    
    doctorName: { type: String, trim: true },
    doctorEmail: { type: String, trim: true, lowercase: true },
    patientName: { type: String, trim: true },
    status: {
        type: String,
        enum: ['booked', 'completed', 'cancelled'],
        default: 'booked'
    },
    feedback: feedbackSchema
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);