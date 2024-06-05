const { Router } = require("express");
const userRoutes = require("./authRoutes");

const router = Router();

router.use("/auth", userRoutes);

module.exports = router;
