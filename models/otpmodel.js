const mongoose = require('mongoose')

const otp_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp : {
        type: Number,
        required: true
    },
    createdAt : {
        type: Date,
        required:true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})
const otp_model = mongoose.model('otp', otp_schema)
module.exports = otp_model;