const referral_model = require("../models/referralmodel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
const { sendNotificationTocandidate } = require('../functions/sendNotification')
const jwt = require('jsonwebtoken')
const jwtkey = 'randomSecretKey'
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
        const { location, title, job_description, company, domain, endDate } = req.body // remove company and take company from that user only
        if (location && job_description && company && domain && endDate) {
            const id = crypto.randomBytes(64).toString("hex");
            const new_referral = referral_model({
                company: company,          //Change when jsonwebtoken is integrated
                location: location,
                title: title,
                job_description: job_description,
                domain: domain,
                endDate: endDate,
                candidatesApplied: [],
                totalCandidatesApplied: 0,
                referral_id:id
            })
            await new_referral.save()
            sendNotificationTocandidate(location, company, domain)
            res.status(200).json({
                msg:"New referral successfully created!"
            })
        }
        else {
            res.status(400).json({
                msg:"Please enter all the fields!!"
            })
        }
    }
    static applyForReferral = async (req, res) => {
        const { referral_id, reason } = req.body
        const isRefId = await referral_model.findOne({ referral_id })
        if (!isRefId) {
            res.status(400).json({
                msg:"No referral found!!"
            })
        }
        else {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, jwtkey)
            const userObj = {
                email: decoded.email,
                reason: reason
            }
            const update = await referral_model.findOneAndUpdate(
                { referral_id },
                { $push: { candidatesApplied: userObj } },
                { new: true }
            )
            const ref = await referral_model.findOne({ referral_id })
            var total = ref.totalCandidatesApplied
            await referral_model.findOneAndUpdate(
                { referral_id },
                { $set: { totalCandidatesApplied: total+1 } },
                { new: true }
            )
            if (update) {
                res.status(200).json({
                    msg: "Referral applied successfully!"
                })
            }
            else {
                res.status(400).json({
                    msg: "Something went wrong!"
                })
            }
        }
    }
    static getDetailsofReferral = async (req, res) => {
        const { referral_id } = req.params
        const isRefId = await referral_model.findOne({ referral_id })
        if (!isRefId) {
            res.status(400).json({
                msg: "No referral found!!"
            })
        }
        else {
            res.status(200).json({
                refDetails: isRefId
            })
        }
    }
}
module.exports = referralController