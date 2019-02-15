const Server = require('./Server');
const Crawler = require('./Crawler');
const FileSystem = require('./FileSystem');
const Log = require('./Logger.js');
const Configuration = require('./config');

const exporter = async customConfig => {
  const config = Configuration.merge(customConfig);
  const { routes, port, sourceDir, browser: browserConfig } = config;
  const crawler = new Crawler(browserConfig);
  const fileSystem = new FileSystem(config);
  const server = new Server(sourceDir, port);
  const log = new Log(config);

  fileSystem.cleanExportDir();
  fileSystem.createExportDir();
  fileSystem.copyResources();

  const serverUrl = await server.start();
  await crawler.open();
  await Promise.all(
    routes.map(async (route) => {
      await crawler.crawl(`${serverUrl}${route}`).then(pageContent => {
        fileSystem.writeFile(pageContent, route)
      });
    })
  );
  await crawler.finish();
  server.close();
  log.logFinish();
};
module.exports = exporter;
