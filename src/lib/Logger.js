const chalk = require('chalk')

module.exports = class Logger {
  constructor(config) {
    this.config = config
  }

  logFinish() {
    console.log(
      chalk.green('✓', 'website exported in folder'),
      this.config.exportDir
    )
    console.log(`You may serve it with a static server:

npm install -g serve 
    
serve -s ${this.config.exportDir}
    `)
  }
}
