const path = require('path');
const express = require('express');
const chalk = require('chalk');

module.exports = class Server {
  constructor(basePath, port) {
    this.basePath = path.join(process.cwd(), basePath);
    this.port = port;
  }

  start() {
    const webApp = express();

    webApp.use(express.static(this.basePath));
    webApp.get('*', (req, res) => {
      res.sendFile(path.join(this.basePath, '/index.html'));
    });

    return new Promise((resolve, reject) => {
      this.server = webApp.listen(this.port, async () => {
        const url = `http://localhost:${this.port}`;
        console.log(chalk.green('🚀', 'server is listening'), url);
        resolve(url);
      });
    });
  }

  close() {
    this.server.close();
  }
};
