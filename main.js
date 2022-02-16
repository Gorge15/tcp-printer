const ws = require("ws");
const port = 8000;

const server = new ws.Server({port: port});

server.on("connection", () => {
    console.log(`cineva s-a logat`)
})