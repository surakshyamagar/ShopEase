// "Is someone already logged in? If yes, who is that user?" id, name, emil, role
// the bridge between your backend authentication and React's AuthContext.

import User from "../models/User.js";

const getProfile = async (req, res) => {
  try {
    // authMiddleware already verified the JWT
    // and stored the user's information in req.user

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getProfile;