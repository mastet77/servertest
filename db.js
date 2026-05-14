const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

// teams
db.run(`
CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
`);

// tasks
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT
)
`);

// submissions
db.run(`
CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    teamId INTEGER,
    taskId INTEGER,
    githubLink TEXT,
    score INTEGER DEFAULT 0
)
`);

module.exports = db;