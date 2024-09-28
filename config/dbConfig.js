const mysql = require("mysql");
const fs = require("fs");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");

  // Create database if it doesn't exist
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
    (err) => {
      if (err) {
        console.error("Error creating database:", err);
        return;
      }
      console.log(
        `Database '${process.env.DB_NAME}' created or already exists`
      );

      connection.query(`USE ${process.env.DB_NAME}`, (err) => {
        if (err) {
          console.error("Error selecting database:", err);
          return;
        }
        console.log(`Switched to database '${process.env.DB_NAME}'`);

        const schemaFiles = fs.readdirSync("./sql");

        // Executing each schema file
        schemaFiles.forEach((file) => {
          if (file.endsWith(".sql")) {
            const schema = fs.readFileSync(`./sql/${file}`, "utf8");
            const queries = schema
              .split(";")
              .filter((query) => query.trim() !== "");
            queries.forEach((query) => {
              connection.query(query, (err, result) => {
                if (err) {
                  if (err.code === "ER_TABLE_EXISTS_ERROR") {
                    console.log(`Table already exists: ${query}`);
                  } else {
                    console.error(`Error executing query in ${file}:`, err);
                  }
                } else {
                  console.log(`Query executed successfully in ${file}`);
                }
              });
            });
          }
        });
      });
    }
  );

module.exports = connection;
