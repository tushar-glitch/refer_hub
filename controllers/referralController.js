const referral_model = require("../models/referralmodel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
class referralController{
    static getlistofreferrals = async (req, res) => {
        const { location, company, domain } = req.query
        var filterObj = {}
        if (location) {
            filterObj.location = location
        }
        if (company) {
            filterObj.company = company
        }
        if (domain) {
            filterObj.domain = domain
        }
        console.log(filterObj);
        const results = await referral_model.find(filterObj)
        res.status(200).json({
            referrals:results
        })
    }
    static postreferral = async (req, res) => {
        const { location, job_description, company, domain, endDate } = req.body // remove company and take company from that user only
        if (location && job_description && company && domain && endDate) {
            const id = crypto.randomBytes(64).toString("hex");
            const new_referral = referral_model({
                company: company,          //Change when jsonwebtoken is integrated
                location: location,
                job_description: job_description,
                domain: domain,
                endDate: endDate,
                job_id:id
            })
            await new_referral.save()
            res.status(200).json({
                msg:"New referral successfully created!"
            })
            const temp = await referral_model.find()
            console.log(temp);
        }
    }
}
module.exports = referralController