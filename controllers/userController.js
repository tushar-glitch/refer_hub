const auth_Model = require("../models/userModel")
const otp_model = require("../models/otpmodel")
const crypto = require('crypto')
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
class userController {
    static emailToken = async (email, id) => {
        if (email) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "tusharc20001@gmail.com",
                    pass: "udfmjqntdpovoaoi",
                },
            });
            const mailoptions = {
                from: "tusharc20001@gmail.com",
                to: email,
                subject: "Verify your email",
                html: `Your otp for verification is <a href='https://refer-hub.onrender.com/api/auth/verifytoken/${id}'>http://localhost:3000/${id}</a>. This code will expire in an <b>1 hour</b>`
            }
            // res.status(200).json({
            //     message:"Otp sent successfully"
            // })
            await transporter.sendMail(mailoptions)
        }
        else {
            res.status(400).json({
                message: "Email is required"
            })
        }
    }
    static emailTokenVerify = async (req, res) => {
        const _id = req.params.id
        console.log(_id);
        if (_id) {
            const isid = await auth_Model.findOne({ emailToken: _id })
            if (isid) {
                res.sendFile(__dirname + '/registrationConfirmed.html')
                await auth_Model.updateOne({ emailToken: _id }, { $set: { isverified: true } })
                const temp = auth_Model.find()
                console.log(temp);
            }
        }
        else {
            res.status(400).json({
                message: "Invalid verification link!"
            })
        }
    }

    static sendotp = async (req, res) => {
        const { email } = req.body
        if (email) {
            const otp = Math.floor(((Math.random() * 9000) + 1000))
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "tusharc20001@gmail.com",
                    pass: "udfmjqntdpovoaoi",
                },
            });
            const mailoptions = {
                from: "tusharc20001@gmail.com",
                to: email,
                subject: "Verify your email",
                html: `Your otp for verification is <b>${otp}</b>. This code will expire in an <b>1 hour</b>`
            }
            const newOtpVerfication = await new otp_model({
                email: email,
                otp: otp,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            })
            res.status(200).json({
                message: "Otp sent successfully"
            })
            await newOtpVerfication.save()
            await transporter.sendMail(mailoptions)
        }
        else {
            res.status(400).json({
                message: "Email is required"
            })
        }
    }

    static verifyotp = async (req, res) => {
        const { email, user_otp } = req.body
        if (email && user_otp) {
            const otprecords = await otp_model.find({
                email: email
            })

            if (otprecords.length == 0) {
                res.status(403).json({
                    message: "Account does not exist or is already verified!"
                })
            }
            else {
                const expiresAt = otprecords[otprecords.length - 1].expiresAt
                const otp = otprecords[otprecords.length - 1].otp
                console.log(user_otp);
                console.log(otp);
                if (expiresAt < Date.now()) {
                    res.status(403).json({
                        message: "Otp has expired!"
                    })
                }
                else {
                    if (user_otp == otp) {
                        res.status(200).json({
                            message: "Your account has been verified!"
                        })
                    }
                    else {
                        res.status(403).json({
                            message: "Wrong otp!"
                        })
                    }
                }
            }
        }
        else {
            res.status(404).json({
                message: "Please provide email and otp"
            })
        }
    }

    static userRegistration = async (req, res) => {
        const { name, email, password, Role_id } = req.body
        if (name && email && password && Role_id) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                if (Role_id == 100 || Role_id == 200) {
                    const newpass = await bcrypt.hash(password, 10)
                    const id = crypto.randomBytes(128).toString("hex");
                    const new_user = auth_Model({
                        name: name,
                        dob: null,
                        email: email,
                        contact_no: null,
                        password: newpass,
                        emailToken: id,
                        Role_id: Role_id,
                        isverified: false
                    })
                    const temp = await auth_Model.find()
                    console.log(temp);
                    await auth_Model.deleteMany({})
                    const temp2 = await auth_Model.find()
                    console.log('fdasdfasfasdfasdf');
                    console.log(temp2+'temp2');
                    const save_user = await new_user.save()
                    userController.emailToken(email, id)

                    res.status(200).json({
                        message: "A verify email has been sent to your email id!"
                    })
                }
                else {
                    res.status(400).json({
                        msg: "Invalid Role!"
                    })
                }
            }
            else {
                res.status(403).json({
                    "message": "User already exist!"
                })
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
            console.log('Field empty');
        }
    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            const isuser = await auth_Model.findOne({ email: email })
            if (!isuser) {
                res.status(403).json({
                    "message": "Email not found"
                })
            }
            else {
                const ispasscorrect = await bcrypt.compare(password, isuser.password)
                if (!ispasscorrect) {
                    res.status(403).json({
                        "message": "Incorrect password"
                    })
                }
                else {
                    res.status(200).json({
                        message: "Login successfull"
                    })
                }
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
        }
    }
}

module.exports = userController