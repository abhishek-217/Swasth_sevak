const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true
    },
    picture: {
        type: String
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // Simple 10-digit validation
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
}, { timestamps: true }); // Adds createdAt, updatedAt automatically

module.exports = mongoose.model('Patient', patientSchema);