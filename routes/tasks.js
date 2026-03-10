// API
const express = require("express");
const router = express.Router();

// временная БД
const tasks = [
    {
        id: 1,
        title: "First Task",
        description: "Solve the problem",
        tournamentId: 1
    }
];

router.post("/", (req, res) => {

    if (!req.body.title || !req.body.tournamentId) {
        return res.status(400).json({ error: "title and tournamentId required" });
    }

    const task = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        tournamentId: req.body.tournamentId
    };

    tasks.push(task);
    res.json(task);
});

router.get("/", (req, res) => {
    res.json(tasks);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Not found" });
    }

    res.json(task);
});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Not found" });
    }

    task.title = req.body.title;
    task.description = req.body.description;

    res.json(task);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    tasks.splice(index, 1);
    res.json({ ok: true });
});

module.exports = router;