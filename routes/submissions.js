const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all
router.get("/", (req, res) => {

    db.all("SELECT * FROM submissions", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// GET one
router.get("/:id", (req, res) => {

    db.get(
        "SELECT * FROM submissions WHERE id = ?",
        [req.params.id],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (!row) {
                return res.status(404).json({
                    error: "Not found"
                });
            }

            res.json(row);
        }
    );
});

// POST
router.post("/", (req, res) => {

    const { teamId, taskId, githubLink } = req.body;

    if (!teamId || !taskId || !githubLink) {
        return res.status(400).json({
            error: "teamId, taskId, githubLink required"
        });
    }

    db.run(
        `INSERT INTO submissions
        (teamId, taskId, githubLink, score)
        VALUES (?, ?, ?, ?)`,
        [teamId, taskId, githubLink, 0],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                id: this.lastID,
                teamId,
                taskId,
                githubLink,
                score: 0
            });
        }
    );
});

// UPDATE SCORE
router.put("/:id", (req, res) => {

    db.run(
        "UPDATE submissions SET score = ? WHERE id = ?",
        [req.body.score, req.params.id],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                ok: true
            });
        }
    );
});

// DELETE
router.delete("/:id", (req, res) => {

    db.run(
        "DELETE FROM submissions WHERE id = ?",
        [req.params.id],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                ok: true
            });
        }
    );
});

module.exports = router;