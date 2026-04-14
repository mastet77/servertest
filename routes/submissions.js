// API
const express = require("express");
const router = express.Router();

// временная БД
const submissions = [
    {
        id: 1,
        teamId: 1,
        taskId: 1,
        githubLink: "https://github.com/example",
        videoLink: "https://youtube.com/example",
        score: 0
    }
];

router.post("/", (req, res) => {

    if (!req.body.teamId || !req.body.taskId || !req.body.githubLink) {
        return res.status(400).json({ error: "teamId, taskId, githubLink required" });
    }

    const submission = {
        id: Date.now(),
        teamId: req.body.teamId,
        taskId: req.body.taskId,
        githubLink: req.body.githubLink,
        videoLink: req.body.videoLink,
        score: 0
    };

    submissions.push(submission);
    res.json(submission);
});

router.get("/", (req, res) => {
    res.json(submissions);
});

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);
    const submission = submissions.find(s => s.id === id);

    if (!submission) {
        return res.status(404).json({ error: "Not found" });
    }

    res.json(submission);
});

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);
    const submission = submissions.find(s => s.id === id);

    if (!submission) {
        return res.status(404).json({ error: "Not found" });
    }

    submission.score = req.body.score;

    res.json(submission);
});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);
    const index = submissions.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    submissions.splice(index, 1);
    res.json({ ok: true });
});

module.exports = router;