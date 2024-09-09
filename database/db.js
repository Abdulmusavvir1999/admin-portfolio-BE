const mysql = require("mysql2");
const util = require('util');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ABDUl@123",
    database: "portfolio",
    // If you encounter SSL connection issues, you can disable SSL explicitly
    // ssl: { rejectUnauthorized: false }
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:");
        return;
    }
    console.log("Connected to MySQL database");
});

db.query = util.promisify(db.query);

module.exports = db;
