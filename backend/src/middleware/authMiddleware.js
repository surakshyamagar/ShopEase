// Check whether the request contains a valid JWT.
import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    try{
        // Get the JWT from the cookie browser
        // cookies: {token:"", language:"", theme:"dark" etc}
        const token = req.cookies.token;

        if (!token){
           return res.status(401).json({
            success: false,
            message: "Authentication required",
        }); 
        }

         // Check whether the JWT is valid
        //  pass two arguments: and verify function verifies
        const verifiedUser  = jwt.verify(
            token,
            // to check the JWT's signature.
            process.env.JWT_SECRET
        );

        // verifiedUser  contains the information
        // that we put inside the JWT when logging in.
        //
        // Our JWT contains:
        // {
        //   id: existingUser._id,
        //   role: existingUser.role
        // }
        //
        // Save that information inside req.user; id, role
        // attaching the logged-in user's information to the request.
        // so controllers can use it later.
        req.user = verifiedUser ;

        // Everything is okay.
        // Move to the next middleware/controller.
        next();
    } catch (error) {
        // Token is invalid or expired
        return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        });
    }
};

export default authenticateUser;