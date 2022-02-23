const WebScoketClient = require("websocket").client;
const { printOptions } = require("./config");
const fs = require("fs");
const htmlToPdf = require("html-pdf-node");
const ptp = require("spdf-to-printer");
const path = require("path");
let key = "";
let url = `wss://socketsbay.com/wss/v2/100/${key}/`;

let client = new WebScoketClient();

client.on("connect", (connection) => {
  console.log("WEBSOCKET LEGAT");
  connection.on("message", (msg) => {
      console.log("Cineva s-a conectat la imprimanta")
    let message = msg.utf8Data;

    fs.readFile("./test.html", async (err, data) => {
      if (err) return console.log(err);
      const metadata = data;
      const file = { content: metadata };
      let pdf = await htmlToPdf.generatePdf(file, printOptions);
      await fs.writeFileSync("./test.pdf", pdf, "binary");
      await console.log("Incepe printarea");
      await fs.unlink("./test.pdf", (err) => {
        if (err) return console.log(err);
      });
    });
  });
});

client.connect(url, "echo-protocol");
