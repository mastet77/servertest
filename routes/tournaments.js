// API
const express = require("express");
const router = express.Router();

// временная БД
const tournaments = [
    { id: 11, name: "Tournament A" },
    { id: 22, name: "Tournament B" },
    { id: 33, name: "Tournament C" }
];

router.post("/", (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ error: "name is required" });
    }

    const tournament = {
        id: Date.now(),
        name: req.body.name
    };

    tournaments.push(tournament);
    res.json(tournament);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);
    const tournament = tournaments.find(t => t.id === id);

    if (!tournament) {
        return res.status(404).json({ error: "Not Found" });
    }

    res.json(tournament);
});

router.get("/", (req, res) => {
    res.json(tournaments);
});

router.put("/:id", (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ error: "name is required" });
    }

    const id = Number(req.params.id);
    const tournament = tournaments.find(t => t.id === id);

    if (!tournament) {
        return res.status(404).json({ error: "Not found" });
    }

    tournament.name = req.body.name;
    res.json(tournament);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);
    const index = tournaments.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    tournaments.splice(index, 1);
    res.json({ ok: true });
});

module.exports = router;