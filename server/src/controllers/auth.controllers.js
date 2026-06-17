const express = require('express');
const userModel = require('../models/Auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../middleware/sendEmail');

async function registerUser(req, res) {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and password'
            });
        }

        const exitUser = await userModel.findOne({ email });
        if (exitUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const otp = crypto.randomInt(100000, 999999).toString();

        const user = new userModel({
            name,
            email,
            password,
            verifyEmailOtp: otp,
            verifyEmailOtpExpires: Date.now() + 10 * 60 * 1000
        })

        await user.save();

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.verifyEmailOtp;

        const htmlMessage = `
        <html>
        <body>
            <h2>Verify Email</h2>
            <p>Your OTP is:</p>
            <h3>${otp}</h3>
            <p>This OTP will expire in 10 minutes.</p>
        </body>
        </html>
        `
        const data = {
            email: user.email,
            subject: 'Verify your email',
            message: `Your OTP is ${otp}`,
            html: htmlMessage
        }

        try {
            await sendEmail(data);
        } catch (mailError) {
            await userModel.deleteOne({ _id: user._id });
            return res.status(500).json({
                success: false,
                message: 'Error sending email, please try again'
            })
        }

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userObj
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

async function verifyEmail(req, res) {
    const { email, otp } = req.body;
    try {
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Please provide OTP'
            })
        }
        const user = await userModel.findOne({
            verifyEmailOtp: otp,
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            })
        }
        if (!user.verifyEmailOtpExpires || user.verifyEmailOtpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP expired! Please request a new one."
            })
        }

        user.verifyEmailOtp = undefined;
        user.verifyEmailOtpExpires = undefined;
        user.isVerified = true;
        await user.save();

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.verifyEmailOtp;
        delete userObj.resetPasswordToken;

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        return res.status(200).cookie("token", token, options).json({
            success: true,
            message: "Email verified successfully!",
            user: userObj
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error verifying email, please try again'
        })
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        if (!user.isVerified) {
            const otp = crypto.randomInt(100000, 999999).toString();
            Date.now() + 10 * 60 * 1000;
            user.verifyEmailOtp = otp;
            await user.save();

            const htmlMessage = `
            <h2>Verify Email</h2>
            <p>Your OTP is:</p>
            <h3>${otp}</h3>
            <p>This OTP will expire in 10 minutes.</p>
            `

            const data = {
                email: user?.email,
                sunject: "Verify your email",
                message: `Your OTP for email verification id ${otp}`,
                html: htmlMessage,
            }
            try {
                await sendEmail(data)
            } catch (error) {
                console.error("Email error:", error);
                return res.status(500).json({
                    success: false,
                    needsVerification: true,
                    message: "Your account is not verified. Failed to send OTP email. Please try again"
                })
            }
            return res.status(401).json({
                success: false,
                needsVerification: true,
                message: "Your account is not verified. Please verify your email to login"
            })
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.verifyEmailOtp;
        delete userObj.resetPasswordToken;

        return res.
            status(200)
            .cookie("token", token, options)
            .json({
                success: true,
                message: 'User logged in successfully',
                user: userObj
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

async function logoutUser(req, res) {
    try {
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        }
        return res.status(200).clearCookie("token", {
            ...options,
            expires: new Date(0) // 🔥 force immediate expiry
        }).json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error while logout'
        })
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email'
            })
        }

        // find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'If a user with that email exists, a password reset link has been sent'
            })
        }

        const resetToken = crypto.randomBytes(20).toString('hex');

        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordTokenExpires = Date.now() + 10 * 60 * 1000;

        await user.save({
            validateBeforeSave: false
        });

        const checkUser = await userModel.findById(user._id);

        // console.log("Saved token:", checkUser.resetPasswordToken);
        // console.log("Expires:", checkUser.resetPasswordTokenExpires);

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

        const htmlMessage = `
        <h2>Password Reset</h2>
        <p>You have requested to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetPasswordUrl}" >Reset Password</a>  
        <p>This link will expire in 10 minutes.</p>  
        `

        try {
            await sendEmail({
                email: user.email,
                subject: "Password Reset Request",
                message: `You have requested to reset your password. Please use the following link to reset your password: ${resetPasswordUrl}`,
                html: htmlMessage
            })
        } catch (error) {
            console.error("Email error:", error);
            user.resetPasswordToken = undefined;
            user.resetPasswordTokenExpires = undefined;
            await user.save({
                validateBeforeSave: false
            })
            return res.status(500).json({
                success: false,
                message: "Failed to send password reset email. Please try again"
            })
        }
        return res.status(200).json({
            success: true,
            message: 'If a user with that email exists, a password reset link has been sent'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error'
        })
    }
}

async function resetPassword(req, res) {
    try {
        const { password, confirmPassword } = req.body;
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide password and confirm password'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match'
            })
        }
        console.log("Token from URL:", req.params.token);
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest("hex");
        // console.log("Hashed token:", hashedToken);
        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordTokenExpires: { $gt: Date.now() }
        })
        // console.log("Found user:", user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token"
            })
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Error with reseting password",
            err,
        })
    }
}

module.exports = { registerUser, verifyEmail, loginUser, logoutUser, forgotPassword, resetPassword }