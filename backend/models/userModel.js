const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Username field is mandatory"],
            lowercase: [true, "Username should be in lowercase"],
            unique: true
        },
        fullName: {
            type: String,
            required: [true, "Name field is mandatory"]
        },
        phone: {
            type: String,
            required: [true, "Phone number field is mandatory"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Email field is mandatory"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password field is mandatory"]
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return JWT.sign(
        {
            id: this._id,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2h"
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return JWT.sign( 
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "5h"
        }
    )
}

module.exports = mongoose.model("User", userSchema);