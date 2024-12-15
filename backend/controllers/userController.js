const User = require("../models/userModel");
const asyncHandler = require('express-async-handler')
const Apiresponse = require("../utilities/APIresponses");
const APIError = require("../utilities/APIerrorHandler");

const generateTokens = async (id) => {
    const user = await User.findById(id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false}); 

    return {accessToken, refreshToken};
}
 
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if(!users){
        res.status(500);
        throw new APIError(500, "Something went wrong while fetching the users");
    }
    res.status(200).json(
        new Apiresponse(200, users, "Users fetched successfully")
    );
})

const registerUser = asyncHandler(async (req, res) => {
    const {userName, fullName, email, phone, password} = req.body;
    if(!userName || !fullName || !email || !phone || !password){
        res.status(400);
        throw new APIError(400, "All fields are mandatory.");
    }

    const isUserRegistered = await User.findOne({
        $or: [{userName},{email}, {phone}]
    });
    if(isUserRegistered){
        res.status(409);
        throw new APIError(409, "User already registered.");
    }

    const newUser = await User.create({
        userName,
        fullName,
        email,
        phone,
        password
    })
    const createdUser = await User.findById(newUser._id).select("-password");
    if(!createdUser){
        res.status(500);
        throw new APIError(500, "Something went wrong while registering the user");
    }
    res.status(200).json(
        new Apiresponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body;
    if(!userName || !email || !password){
        res.status(400);
        throw new APIError(400, "All fields are mandatory");
    }
    const currentUser = await User.findOne({
        $or: [{userName}, {email}]
    });
    if(!currentUser){
        res.status(404);
        throw new APIError(404, "User is not registered.");
    }

    const isCorrect = await currentUser.isPasswordCorrect(password);
    if(!isCorrect){
        res.status(401);
        throw new APIError(401, "Password incorrect");
    }

    const {accessToken, refreshToken} = await generateTokens(currentUser._id);
    const loggedInUser = await User.findById(currentUser._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200)
    .cookie("Access-Token", accessToken, options)
    .cookie("Refresh-Token", refreshToken, options)
    .json(
        new Apiresponse(200, {user: loggedInUser, refreshToken, accessToken}, "Login successfull")
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("Access-Token", options)
    .clearCookie("Refresh-Token", options)
    .json(new Apiresponse(200, {}, "User logged Out"))
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        res.status(400);
        throw new APIError(400, "Invalid old password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new Apiresponse(200, {}, "Password changed successfully"))
})

const updateProfile = asyncHandler(async (req, res) => {
    const {userName, fullName, phone, email} = req.body

    if (!userName || !fullName || !phone || !email) {
        res.status(400);
        throw new APIError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                userName, userName,
                fullName: fullName,
                phone: phone,
                email: email,
            }
        },
        {new: true}
        
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new Apiresponse(200, user, "Account details updated successfully"))
})

const deleteAccount = asyncHandler(async (req, res) => {
    const user = await User.deleteOne({"_id": req.user._id});
    if(!user){
        res.status(500);
        throw new APIError(500, "Something went wrong while deleting the account");
    }

    return res.status(200).json(
        new Apiresponse(200, user, "Account deleted successfully.")
    )
})

const getMyAdds = asyncHandler(async (req, res)=>{
    const user = req.user;
    const adds = await User.findById(user.id).populate('posts');

    res.status(200).json(new Apiresponse(200, adds.posts, "Fetched all posts successfully."));
})

 
module.exports = {registerUser, getUsers, loginUser, logoutUser, changeCurrentPassword, updateProfile, deleteAccount, getMyAdds};