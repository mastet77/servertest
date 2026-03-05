// API
const express = require("express");
const router = express.Router();

// временная БД
const matches = [
    {
        id: 1,
        teamA: 11,
        teamB: 22,
        scoreA: 0,
        scoreB: 0
    }
];

router.post("/", (req, res) => {

    if (!req.body.teamA || !req.body.teamB) {
        return res.status(400).json({ error: "teamA and teamB required" });
    }

    const match = {
        id: Date.now(),
        teamA: req.body.teamA,
        teamB: req.body.teamB,
        scoreA: 0,
        scoreB: 0
    };

    matches.push(match);
    res.json(match);
});

router.get("/", (req, res) => {
    res.json(matches);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);
    const match = matches.find(m => m.id === id);

    if (!match) {
        return res.status(404).json({ error: "Not found" });
    }

    res.json(match);
});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);
    const match = matches.find(m => m.id === id);

    if (!match) {
        return res.status(404).json({ error: "Not found" });
    }

    match.scoreA = req.body.scoreA;
    match.scoreB = req.body.scoreB;

    res.json(match);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);
    const index = matches.findIndex(m => m.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    matches.splice(index, 1);
    res.json({ ok: true });
});

module.exports = router;