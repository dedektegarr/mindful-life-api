const { Router } = require("express");
const authController = require("../controllers/authController");
const userRoutes = Router();

userRoutes.post("/signup", authController.signup);

module.exports = userRoutes;
