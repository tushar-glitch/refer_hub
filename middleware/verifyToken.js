const auth_Model = require("../models/userModel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const jwtkey = 'randomSecretKey'
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
const verifytoken = (req, res, next) => {
    const bearerheader = req.headers['authorization']
    if (bearerheader !== undefined) {
        const tokenArr = bearerheader.split(' ')
        const token = tokenArr[1]
        const temp = jwt.verify(token, jwtkey, (err, authdata) => {
            if (err) {
                res.status(400).json({
                    message: "Invalid Token"
                })
            }
            else {
                userdata = authdata
                console.log(authdata);
                next()
            }
        })
    } else {
        res.status(400).json({
            message: "Authorization unsuccussfull"
        })
        return
    }
}
module.exports = {emailTokenVerify, verifytoken}
