const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const APIError = require("../utilities/APIerrorHandler");

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            res.status(401);
            throw new APIError(401, "Unauthorized request")
        }    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken")
        if (!user) {
            res.status(401);
            throw new APIError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        res.status(401);
        throw new APIError(401, error?.message || "Invalid access token")
    }
})

module.exports = verifyJWT;