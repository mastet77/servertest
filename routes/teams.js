// API
const express = require("express");
const router = express.Router();

// временная БД
const teams = [
    { id: 11, name: "Team A" },
    { id: 22, name: "Team B" }
];

router.post("/", (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ error: "name is required" });
    }

    const team = {
        id: Date.now(),
        name: req.body.name
    };

    teams.push(team);
    res.json(team);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);
    const team = teams.find(t => t.id === id);

    if (!team) {
        return res.status(404).json({ error: "Not Found" });
    }

    res.json(team);
});

router.get("/", (req, res) => {
    res.json(teams);
});

router.put("/:id", (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({ error: "name is required" });
    }

    const id = Number(req.params.id);
    const team = teams.find(t => t.id === id);

    if (!team) {
        return res.status(404).json({ error: "Not found" });
    }

    team.name = req.body.name;
    res.json(team);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);
    const index = teams.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    teams.splice(index, 1);
    res.json({ ok: true });
});

module.exports = router;