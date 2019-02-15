const puppeteer = require('puppeteer')
const CLI = require('clui')
const Spinner = CLI.Spinner

module.exports = class Crawler {
  constructor(browserConfig) {
    this.browserConfig = browserConfig
  }

  async open() {
    this.browser = await puppeteer.launch({
      headless: this.browserConfig.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
      // ,slowMo: 500
      // ,devtools: true
    })
  }
  async crawl(url) {
    const status = new Spinner(`crawling ${url}`)
    status.start()
    const page = await this.browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    let bodyHTML = await page.content()
    status.stop()
    return Promise.resolve(bodyHTML)
  }
  async finish() {
    await this.browser.close()
  }
}
