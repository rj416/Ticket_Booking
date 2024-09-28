const db = require("../config/dbConfig");

const getSeatAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const getTrainsQuery =
      "SELECT * FROM trains WHERE source = ? AND destination = ?";
    db.query(getTrainsQuery, [source, destination], (err, results) => {
      if (err) {
        console.error("Error fetching seat availability:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ trains: results });
    });
  } catch (error) {
    console.error("Error fetching seat availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getSeatAvailability };
