import jwt from 'jsonwebtoken';
import TokenModel from '../schemas/token.js';

import { REFERESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from '../config/env.js';

// Sign Access Token

export const signAccessToken = (payload, expiryTime) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
}


//Sign Referesh Token
export const signRefereshToken = (payload, expiryTime) => {
    return jwt.sign(payload, REFERESH_TOKEN_SECRET, { expiresIn: expiryTime });
}

//Verify Referesh Token
export const verifyRefereshToken = (token) => {
    return jwt.verify(token, REFERESH_TOKEN_SECRET);
}

//Verify Access Token
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

//Store Referesh Token
export const storeRefereshToken = async (userId, token) => {
    try {
        const newToken = new TokenModel({
            refershToken: token,
            userId: userId
        });
        await newToken.save();
        return true;
    } catch (error) {
        return false;
    }
}