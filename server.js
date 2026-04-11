// cd C:\code\servertest
// req - запрос, res - ответ
// http://localhost:3000/
const express = require("express");
const app = express();

app.use(express.json());

const tournamentsRoutes = require("./routes/tournaments");
const matchesRoutes = require("./routes/matches");
const teamsRoutes = require("./routes/teams");
const tasksRoutes = require("./routes/tasks");
const submissionsRoutes = require("./routes/submissions");

app.use("/api/submissions", submissionsRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/matches", matchesRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
