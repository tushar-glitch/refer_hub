const referral_model = require("../models/referralmodel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
const jwtkey = 'randomSecretKey'
const jwt = require('jsonwebtoken')
const candidateModel = require("../models/candidatemodel")
const multer = require('multer')
const Document = require('./Document')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('resume');
class candidateController {
    static profileQues = async (req, res) => {
        // Use the `upload` middleware to extract the PDF file from the request
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({ error: err });
            } else if (err) {
                return res.status(500).json({ error: err });
            }

            const { domain, location, companies, minExp, maxExp } = req.body;
            const { buffer, mimetype } = req.file;
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, jwtkey);
            const candidateEmail = decoded.email;
            const candidateUser = await candidateModel.findOneAndUpdate(
                { email: candidateEmail },
                {
                    $set: {
                        domain: domain,
                        companies: companies,
                        location: location,
                        minExp: minExp,
                        maxExp: maxExp,
                        resume: { data: buffer, contentType: mimetype },
                    },
                },
                { new: true }
            );
            res.status(200).json({
                msg: 'Answers submitted successfully!',
            });
        });
    };
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