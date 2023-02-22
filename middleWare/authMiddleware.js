const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});

module.exports = protect;


// cheack role based is authorized or not.
const authorizeRoles = (...roles) => { 
  // console.log("Roles : ", ...roles)

  const rolesArray = [...roles];
  try {
      return (req, res, next) => { 
          const userRole = req.user.role;
          const result = rolesArray.map(role => userRole.includes(role)).find(item => item === true);
          // console.log("Result: ", result)

          if(!result) return res.status(401).json({
              message: `${req.user.role} cann't authorized to access this route.`
          })
          next();
      }
      
  } catch (error) {
      res.status(404).json({error: error.message})
  }
}


module.exports = authorizeRoles;