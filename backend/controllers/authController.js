import UserModel from '../schemas/user.js';
import TokenModel from '../schemas/token.js';
import { signAccessToken, signRefereshToken, verifyRefereshToken, verifyAccessToken, storeRefereshToken } from '../services/JWTSerivce.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;


        const isUser = await UserModel.exists({ email: email });

        if (isUser) {
            return res.status(200).json({
                status: 'failed',
                message: 'User already exisits!'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(200).json({
            status: 'success',
            message: 'User registred Succesfully!, Approval Pending!',
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let isUser = await UserModel.findOne({ email });

        if (!isUser) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        if (!isUser.approved) {
            return res.status(200).json({
                status: 'failed',
                message: 'Approval Pending!'
            })
        }

        const match = await bcrypt.compare(password, isUser.password)

        if (!match) {
            return res.status(200).json({
                status: 'failed',
                message: 'Incorrect Password!'
            })
        }

        let accessToken, refershToken;

        accessToken = signAccessToken({ userId: isUser._id, email: isUser.email }, "30m");

        refershToken = signRefereshToken({ userId: isUser._id, email: isUser.email }, "60m")

        try {
            await TokenModel.updateOne({
                userId: isUser._id
            }, {
                refershToken
            }, {
                upsert: true
            })
        } catch (error) {
            return res.status(200).json({
                status: 'failed',
                message: 'Internal Server Error!'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Logged In Succesfully!!',
            accessToken: accessToken,
            refershToken: refershToken,
            user: isUser,
            auth: true
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

export const logoutUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const token = await TokenModel.findOne({ userId });

        if (!token) {
            return res.status(200).json({
                status: 'failed',
                message: 'Token not found!'
            })
        }

        await TokenModel.findOneAndDelete({ userId });

        return res.status(200).json({
            status: 'success',
            message: 'Logged out succesfully!!',
            user: {}
        })
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

export const referesh = async (req, res) => {
    try {
        const { originalRefereshToken } = req.body;

        const match = verifyRefereshToken(originalRefereshToken);

        if (!match) {
            return res.status(200).json({
                status: 'failed',
                message: 'Unauthorized'
            })
        }

        let accessToken, refershToken;

        accessToken = signAccessToken({ userId: match.userId }, "30m");

        refershToken = signRefereshToken({ userId: match.userId }, "60m")

        try {
            await TokenModel.updateOne({
                userId: match.userId
            }, {
                refershToken
            }, {
                upsert: true
            })
        } catch (error) {
            console.log("Internal Server Error", error);
            return res.status(200).json({
                status: 'failed',
                message: 'Internal Server Error!'
            })
        }

        const user = await UserModel.findById(match.userId);

        if (!user) {
            return res.status(200).json({
                status: 'failed',
                message: 'User not found!'
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'Auth Refereshed Succesfully!',
            accessToken: accessToken,
            refershToken: refershToken,
            user: user,
            auth: true
        })

    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}