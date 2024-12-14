import User from "../models/userModel.js"

export const getUserProfile = async (req, res) => {
    const {username} = req.params

    try {
        const user = await User.findOne({username}).select('-password')
        //Check if user exists
        if (!user) {return res.status(404).json({error: "User not found"})}

        res.status(200).json(user)
    } catch (error) {
        console.log("Error getting user profile: ", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}