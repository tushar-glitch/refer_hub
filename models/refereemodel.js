const mongoose = require('mongoose')

const refereeSchema = new mongoose.Schema({
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
const refereeModel = mongoose.model('ReferHub-users-referee', refereeSchema)
module.exports = refereeModel;