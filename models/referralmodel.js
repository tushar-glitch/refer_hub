const mongoose = require('mongoose')

const referral_schema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    company: {
        type: String
    },
    job_description: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Number,
        required: true
    },
    is_expired: {
        type: Boolean
    },
    // Need to add sharing link on various social media platforms
    job_id: {
        type: String
    }
})
const referral_model = mongoose.model('ReferHub-referrals', referral_schema)
module.exports = referral_model;