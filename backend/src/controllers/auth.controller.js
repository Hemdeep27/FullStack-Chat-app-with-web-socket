import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"
import { stringify } from "flatted"

export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characteres" })
        }

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({ message: "Email already exists" })
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })
        if (newUser) {
            // generate JWT Token
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }
    } catch (err) {
        console.log("Error in AUth Controller signup")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        
        if (!user) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.log("Error in AUth Controller Logout")
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in update profile", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const checkAuth = (req,res) => {
    try {
        const user = req.user
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in Auth controller checkAuth", error)
        res.status(500).json({ message: "Internal server error" })
    }
}