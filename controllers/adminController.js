const db = require("../config/dbConfig");

const addNewTrain = async (req, res) => {
  try {
    const { source, destination, totalSeats } = req.body;
    const query =
      "INSERT INTO trains (source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [source, destination, totalSeats, totalSeats],
      (err, result) => {
        if (err) {
          console.error("Error adding new train:", err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }
        res.status(201).json({ message: "Train added successfully" });
      }
    );
  } catch (error) {
    console.error("Error adding new train:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const connection = require("../config/dbConfig");

const updateSeats = async (req, res) => {
  try {
    const { trainId, additionalSeats } = req.body;

    const sql = `UPDATE trains 
                 SET total_seats = total_seats + ?
                 WHERE id = ?`;

    connection.query(sql, [additionalSeats, trainId], (err, result) => {
      if (err) {
        console.error("Error updating seats:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Train not found" });
      }

      res.status(200).json({ message: "Seats increased successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = { addNewTrain, updateSeats };
