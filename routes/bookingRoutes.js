const express = require("express");
const router = express.Router();
const {
  bookSeat,
  getBookingDetails,
} = require("../controllers/bookingController");
const { authenticateUser } = require("../middlewares/authMiddleware");

router.post("/", authenticateUser, bookSeat);
router.get("/details", authenticateUser, getBookingDetails);

module.exports = router;
