const referral_model = require("../models/referralmodel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
class candidateController{
    static getlistofallreferrals = async (req, res) => {
        const all_referrals = await referral_model.find()
        res.status(200).json({
            referrals:all_referrals
        })
    }
}
module.exports = candidateController