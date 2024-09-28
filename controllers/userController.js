const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/dbConfig");


const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error("Error finding user:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || "safasdsfdsf");
      res.json({ token });
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
