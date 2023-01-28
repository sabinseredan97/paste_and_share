var express = require('express');
var db = require("../database");
var router = express.Router();

router.post("/paste/insert", (req, res) => {
  const description = req.body.description;
  const snippet = req.body.snippet;
  const query = "INSERT INTO text_snippets (description, snippet) VALUES (?, ?)";
  db.query(query, [description, snippet], (err, result) => {
      if (err) {console.log(err)}
  });
});

router.get("/paste/search", (req, res) => {
  const { desc } = req.query;
  const query = "SELECT id FROM text_snippets WHERE description = ? ORDER BY id DESC LIMIT 1";
  db.query(query, desc, (err, result) => {
      res.send(result);
  });
});

router.get("/paste/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT description, snippet FROM text_snippets WHERE id = ?";
  db.query(query, id, (err, result) => {
      res.send(result);
  });
});

module.exports = router;
