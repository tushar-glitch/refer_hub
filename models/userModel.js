const mongoose = require('mongoose')

const auth_schema = new mongoose.Schema({
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
    }
})
const auth_Model = mongoose.model('ReferHub-users', auth_schema)
module.exports = auth_Model;