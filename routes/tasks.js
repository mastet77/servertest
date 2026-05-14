const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        res.json(rows);
    });
});

// POST
router.post("/", (req, res) => {

    if (!req.body.title) {
        return res.status(400).json({
            error: "title required"
        });
    }

    db.run(
        "INSERT INTO tasks(title) VALUES(?)",
        [req.body.title],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                id: this.lastID,
                title: req.body.title
            });
        }
    );
});

module.exports = router;