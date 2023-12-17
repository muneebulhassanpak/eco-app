const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
} = require("../controllers/auth-controller");

router.post("/register", registrationController);
router.post("/login", loginController);

module.exports = router;
