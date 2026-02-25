// cd C:\code\servertest
// req - запрос, res - ответ
const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Maxim!");
});

const teams = [{ "name": "Team A" }];

app.post("/api/teams", (req, res) => {
  const team = {
    id: Date.now(),
    name: req.body.name
  };

  teams.push(team);
  res.json(team);
});

app.get("/api/teams/:id", (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);

  if (!team) {
    return res.status(404).json({ error: "Not Found" });
  }

  res.json(team);
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
