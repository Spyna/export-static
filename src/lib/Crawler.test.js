const Crawler = require('./Crawler');
const Server = require('./Server');

const testConfig = {
  headless: true
};

const PORT = 1234;

const crawler = new Crawler(testConfig);
const server = new Server('./', PORT);

describe('Crawler test', () => {
  beforeEach(async () => {
    await server.start();
  });
  afterEach(() => {
    server.close();
  });

  it('opens the headless browser (open)', async () => {
    // jest.mock('puppeteer', () => ({
//   launch: jest.fn()
// }));await crawler.open();
  });

  it('closes the headless browser (finish)', async () => {
    await crawler.open();
    await crawler.finish();
  });

  it('crawls a page (crawl)', async () => {
    await crawler.open();
    const page = `http://localhost:${PORT}/package.json`;
    const content = await crawler.crawl(page);
    expect(content).toContain('<html>');
    await crawler.finish();
  });
});
