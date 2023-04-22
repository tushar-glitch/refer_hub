const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number
    },
    password: {
        type: String,
        required:true
    },
    emailToken: {
        type:String
    },
    Role_id: {
        type: Number,
        required:true
    },
    isverified: {
        type: Boolean,
    },
    notification: {
        type: Array
    },
    newNotification: {
        type: Number
    }
})
const candidateModel = mongoose.model('ReferHub-users-candidate', candidateSchema)
module.exports = candidateModel;