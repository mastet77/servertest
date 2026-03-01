// cd C:\code\servertest
// req - запрос, res - ответ
// http://localhost:3000/
const express = require("express");
const app = express();

app.use(express.json());

const teamsRoutes = require("./routes/teams");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from Maxim!");
});

// Routes
app.use("/api/teams", teamsRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
