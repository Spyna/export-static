#!/usr/bin/env node

const exporter = require('./lib/exporter');
const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');

clear();
console.log(
  chalk.yellow(figlet.textSync('Export static', { horizontalLayout: 'full' }))
);
exporter();
