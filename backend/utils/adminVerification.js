require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../ErrorHandling/Error");

const adminVerification = (req, res, next) => {
  let receivedToken = req?.headers?.cookie;

  if (!receivedToken) {
    throw new CustomError(402, "You are not authorized");
  }

  receivedToken = receivedToken.split("=")[1];

  try {
    const decodedToken = jwt.verify(receivedToken, process.env.JWT_KEY);

    // Destructure username and role from the decoded token
    const { username, role } = decodedToken;

    // Check if the username is 'AdminLia' and the role is 'admin'
    if (username === "AdminLia" && role === "admin") {
      req.user = { ...decodedToken, username, role };
      next();
    } else {
      throw new CustomError(
        403,
        "You are not authorized to access this resource"
      );
    }
  } catch (error) {
    throw new CustomError(401, "Invalid token");
  }
};

module.exports = adminVerification;
