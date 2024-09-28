const express = require("express");
const router = express.Router();
const { getSeatAvailability } = require("../controllers/trainController");

router.get("/availability", getSeatAvailability);

module.exports = router;
