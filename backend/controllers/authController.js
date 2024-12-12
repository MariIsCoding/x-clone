import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {

    try {  
        const { username, fullName, email, password } = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const userExists = await User.findOne({username})
        const emailExists = await User.findOne({email})

        //Check if email is valid      
        if (!emailRegex.test(email)) {
            console.log("Invalid email address:", email);
            return res.status(400).json({ error: "Please enter a valid email" });
          }

        //Check if password is at least 6 characters
        if (password.length < 6) {return res.status(400).json({error: "Password must be at least 6 characters"})}

        //Check if user already exists
        if (userExists) {return res.status(400).json({error: "This username already exists"})}
        if (emailExists)  {return res.status(400).json({error: "Email already exists"})}


        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
             username,
            fullName,
            email,
            password: hashedPassword
        })
        
        if (newUser) {
            generateTokenandSetCookie(newUser._id, res)
            
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,

            })
        } else {
            return res.status(400).json({error: "Invalid user data"})
        }

    } catch (error) {
        console.log("Error signing up: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
};
export const  login = async (req, res) => {
     try {
        console.log(req.body)
        const { password, username} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        

        if (!user  || !isPasswordCorrect) { return res.status(400).json({error: "Invalid credentials"})}
       

        generateTokenandSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        })



     } catch (error) {
        console.log("Error logging in: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
     }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({message: "Successfully logged out"})
    } catch (error) {
        console.log("Error logging out: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)           
    } catch (error) {

    }
}
