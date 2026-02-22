const http = require("http");

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
    // говорим браузеру, что будет HTML
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // HTML с стилями
    res.end(`
    <div style="
      font-weight: bold;       /* жирный */
      font-size: 3em;          /* примерно в 3 раза больше обычного */
      color: white;            /* белый цвет */
      background-color: black; /* фон, чтобы белый был виден */
      text-align: center;      /* по центру */
      margin-top: 20%;
    ">
      Hello, world!
    </div>
  `);
}).listen(port, () => {
    console.log("Server running on port " + port);
});