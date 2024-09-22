const { model } = require("mongoose");
const UserModel = require('../models/users');
const bcrypt = require("bcrypt");
// Import the Nodemailer library
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User Does Not Exist",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect Email Password",
            });
        }
        const accessToken = await jwt.sign({ email: user.email, id: user.id }, 'secret');
        return res.status(200).json({
            accessToken: accessToken,
            message: "Login Success",
        });
    } catch (error) {
        next(error);
    }
};

const signup = async (req, res, next) => {
    try {
        const user = new UserModel(req.body);
        const salt = 10;
        const hashedPasswoed = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPasswoed;
        await user.save();
        res.status(200).json({
            message: "Successfully Added",
            user: user
        })
    }
    catch (error) {
        next(error);
    }
};
const hashPassword = async (pass) => {
    const salt = 10;
    const passw = await bcrypt.hash(pass, salt);
    return passw;
};
const reset = async (req, res, next) => {
    try {
        const Email = req.body.email;
        const otp = req.body.otp;
        const newPass = req.body.newpass;
        const user = await UserModel.findOne({ email: Email })
        if (!user) {
            return res.status(404).json({
                message: "User Does Not Exist",
            });
        }
        console.log("");
        console.log("");
        console.log("");
        console.log("-------------------------------------------------------------");
        console.log(`Old password  =>  ${user.password}`);
        if (user.resetOTP === otp) {
            const pass = await hashPassword(newPass);
            console.log(" ");
            user.password = pass;
            await user.save();
            console.log(`New password  =>  ${user.password}`);
            return res.status(200).json({
                message: "psaaword changes successfully",
            });
        }
        console.log(user);
    }
    
    catch (error) {
        next(error);
    }
};
const forgotPass = async (req, res, next) => {
    try {
        const Email = req.body.email;
        const user = await UserModel.findOne({ email: Email });


        if (!user) {
            return res.status(404).json({
                message: "User Does Not Exist",
            });
        }
        const otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
        user.resetOTP = otp;
        user.save();
        const updatedUser = UserModel.findByIdAndUpdate(user._id, { resetOTP: otp }, { new: true });


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use false for STARTTLS; true for SSL on port 465
            auth: {
                user: 'mohsin.riaz338@gmail.com',
                pass: 'glus fcpr fptp oxxr',
            }
        });

        const mailOptions = {
            from: 'mohsin.riaz338@gmail.com',
            to: `${Email}`,
            subject: 'Sending Email for Reset password',
            text: `${otp}`,
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent: ', info.response);
            }
        });

        res.status(200).json({
            message: "Successfully OTP genrated",
            user: user
        })
    }
    catch (error) {
        console.error(error, 'asds')
        next(error);
    }
};
module.exports = {
    login, signup, forgotPass, reset
};