describe('exporter test', () => {
  jest.mock('./Server', () => {
    return class Server {
      start() {}
      close() {}
    };
  });

  jest.mock('./Crawler', () => {
    return class Crawler {
      open() {}
      async crawl() {}
      finish() {}
    };
  });

  jest.mock('./FileSystem', () => {
    return class FileSystem {
      cleanExportDir() {}
      createExportDir() {}
      copyResources() {}
      writeFile() {}
    };
  });

  it('it exports a folder to a static website', async () => {
    const cli = require('./exporter');
    await cli();
  });
});
