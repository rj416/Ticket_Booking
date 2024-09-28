const express = require("express");
const router = express.Router();
const { addNewTrain, updateSeats } = require("../controllers/adminController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/adminMiddleware");

router.post("/train", authenticateUser, isAdmin, addNewTrain);
router.patch("/updateSeats", authenticateUser, isAdmin, updateSeats);

module.exports = router;
