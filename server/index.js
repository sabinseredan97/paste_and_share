const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/getid/:description", (req, res) => {
    const description = req.params.description;
    const query = "SELECT id FROM text_snippets WHERE description = ? ORDER BY id DESC LIMIT 1";
    db.query(query, description, (err, result) => {
        res.send(result);
    });
});

app.get("/api/sharesnippet/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT description, snippet FROM text_snippets WHERE id = ?";
    db.query(query, id, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const description = req.body.description;
    const snippet = req.body.snippet;
    const query = "INSERT INTO text_snippets (description, snippet) VALUES (?, ?)";
    db.query(query, [description, snippet], (err, result) => {
        if (err) {console.log(err)}
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});
