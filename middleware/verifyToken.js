const auth_Model = require("../models/userModel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
const emailTokenVerify = async (req, res) => {
    const _id = req.params.id
    console.log(_id);
    if (_id) {
        const isid = auth_Model.findOne({ emailToken: _id })
        if (isid) {
            console.log(__dirname);
        }
    }
    else {
        res.status(400).json({
            message: "Invalid verification link!"
        })
    }
}
module.exports = emailTokenVerify
