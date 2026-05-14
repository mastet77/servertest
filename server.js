// http://localhost:3000/

const express = require("express");
const path = require("path");

require("./db");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// routes
app.use("/api/submissions", require("./routes/submissions"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/tournaments", require("./routes/tournaments"));
app.use("/api/teams", require("./routes/teams"));
app.use("/api/matches", require("./routes/matches"));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});