const referral_model = require("../models/referralmodel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
const jwtkey = 'randomSecretKey'
const jwt = require('jsonwebtoken')
const candidateModel = require("../models/candidatemodel")
const { decode } = require("punycode")
class candidateController {
    static profileQues = async (req, res) => {
        const { domain, location, companies, minExp, maxExp } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, jwtkey)
        console.log(decoded);
        const candidateEmail = decoded.email
        console.log(candidateEmail);
        const candidateUser = await candidateModel.findOneAndUpdate(
            { email: candidateEmail },
            { $set: { domain: domain, companies: companies, location: location, minExp: minExp, maxExp: maxExp } },
            { new: true }
        )
        console.log('asdf');
        res.status(200).json({
            msg:"Answers submitted successfully!"
        })
    }
    static getlistofallreferrals = async (req, res) => {
        const all_referrals = await referral_model.find()
        res.status(200).json({
            referrals: all_referrals
        })
    }
    static getdetailsofuser = async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, jwtkey)
        const userDetails = await candidateModel.findOne({ email: decoded.email })
        res.status(200).json({
            userDetails: userDetails
        })
    }
}
module.exports = candidateController