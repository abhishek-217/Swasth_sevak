const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
        match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format validation
    },
    isBooked: {
        type: Boolean,
        default: false
    }
}, { _id: false }); // Prevents automatic ID generation for subdocuments

const dateSchedule = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format validation
    },
    slots: [slotSchema]
}, { _id: false });

const doctorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: v => /^\d{10}$/.test(v),
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    specialization: {
        type: String,
        trim: true
    },
    feesPerSession: {
        type: Number, // Changed to Number type for calculations
        min: 0
    },
    dates: [dateSchedule]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);