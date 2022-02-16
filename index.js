const Server = require("./Server");
const https = require("https");
const fs = require("fs");
const { PORT } = require("./config.js");


const sv = https.createServer({
    cert: fs.readFileSync("./sslcert/cert.pem"),
    key: fs.readFileSync("./sslcert/key.pem"),
});


sv.listen(PORT, () => {
    console.log(`SERVER LISTEN TO PORT ${PORT}`);
});

const server = new Server(sv);
