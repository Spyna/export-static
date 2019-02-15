const fs = require('fs-extra');
const copydir = require('copy-dir');
const path = require('path');
const chalk = require('chalk');

module.exports = class FileSystem {
  constructor(config) {
    const { exportDir, sourceDir, clean } = config;
    this.exportDir = exportDir;
    this.sourceDir = sourceDir;
    this.clean = clean;
  }

  copyResources() {
    const buildDirectory = path.join(this.sourceDir);
    copydir.sync(
      buildDirectory,
      this.exportDir,
      (state, filepath, filename = '') =>
        !filename.endsWith('.html') || filename === '404.html'
    );
  }

  createExportDir() {
    if (!fs.existsSync(this.exportDir)) {
      console.log(chalk.green('✓', 'creating target build'), this.exportDir);
      fs.mkdirSync(this.exportDir);
    }
  }

  cleanExportDir() {
    if (this.clean) {
      console.log(chalk.green('✓', 'removing target build'), this.exportDir);
      fs.removeSync(this.exportDir);
    }
  }

  writeFile(source, route) {
    let folder = route;
    let fileName = 'index.html';
    if (route.indexOf('.') !== -1) {
      folder = route.substring(0, route.lastIndexOf('/'));
      fileName = route.substring(route.lastIndexOf('/'));
    }
    const destFolder = path.join(this.exportDir, folder);
    if (!fs.existsSync(destFolder)) {
      fs.mkdirsSync(destFolder);
    }

    const file = path.join(destFolder, fileName);
    fs.writeFileSync(file, Buffer.from(source));
    console.info(chalk.green('🏴', 'written file'), file);
  }
};
