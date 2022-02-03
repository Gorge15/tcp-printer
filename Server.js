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
    console.log(message);
    fs.readFile("./test.html", async (err, data) => {
      if (err) return console.log(err);
      const metadata = data;
      const file = { content: metadata };
      let pdf = await htmlToPdf.generatePdf(file, printOptions);
      await fs.writeFileSync("./test.pdf", pdf, "binary");
      await console.log("Incepe printarea");

      await ptp.print("test.pdf").then(console.log).catch(console.error);
      await fs.unlink("./test.pdf", (err) => {
          if (err) return console.log(err);
      });
    });
  }
}

module.exports = Server;
