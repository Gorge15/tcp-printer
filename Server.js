const WebScoket = require("ws");
const { PORT, printOptions } = require("./config");
const htmlToPdf = require("html-pdf-node");
const ptp = require("spdf-to-printer");
const path = require("path");

const fs = require("fs");

class Server extends WebScoket.Server {
  constructor() {
    super({ port: PORT });

    this.on("connection", this.onConnection);
  }

  onConnection(ws) {
    console.log("Un user s-a logat");
    ws.on("message", this.message);
  }

  async message(data) {
    let message = data.toString("utf-8");
    console.log("New print in coming");
    const template = message;
    const file = { content: template };
    const pdf = await htmlToPdf.generatePdf(file, printOptions);
    await fs.writeFileSync("./temp.pdf", pdf, "binary");
    await ptp.print("./temp.pdf").then(console.log).cache(console.error);
    await fs.unlink("./temp.pdf", err => {
      if (err) return console.error(err);
    })
  }
}

module.exports = Server;
