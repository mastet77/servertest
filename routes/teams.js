const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all
router.get("/", (req, res) => {
    db.all("SELECT * FROM teams", [], (err, rows) => {
        res.json(rows);
    });
});

// POST
router.post("/", (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({
            error: "name required"
        });
    }

    db.run(
        "INSERT INTO teams(name) VALUES(?)",
        [req.body.name],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                id: this.lastID,
                name: req.body.name
            });
        }
    );
});

// DELETE
router.delete("/:id", (req, res) => {

    db.run(
        "DELETE FROM teams WHERE id=?",
        [req.params.id],
        function () {

            res.json({
                ok: true
            });
        }
    );
});

module.exports = router;