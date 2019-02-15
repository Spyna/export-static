const config = require('./config');
const path = require('path');

jest.mock('fs-extra', () => ({
  existsSync: jest.fn()
}));
jest.mock('path', () => ({
  join: jest.fn()
}));

jest.mock('minimist', () => jest.fn());
const minimist = require('minimist');

const fs = require('fs-extra');

describe('Config test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('read the default config when the config file does not exists', async () => {
    fs.existsSync.mockImplementation(name => false);
    minimist.mockReturnValue({  });
    const configuration = config.merge();
    expect(configuration.routes[0]).toBe('/');
  });

  it('read the config file and merge', async () => {
    fs.existsSync.mockImplementation(name => true);
    minimist.mockReturnValue({});
    path.join.mockImplementation(name => {
      return 'example/export.static.config.js';
    });
    const configuration = config.merge();
    expect(configuration.routes.length).toBe(6);
    expect(configuration.routes[0]).toBe('/');
    expect(configuration.routes[1]).toBe('/about/');
    expect(configuration.routes[2]).toBe('/contact/');
  });

  it('uses a custom config if passed', async () => {
    const testRoute = 'test-route';
    const customConfig = {
      routes: [testRoute]
    };
    const configuration = config.merge(customConfig);
    expect(configuration.routes.length).toBe(1);
    expect(configuration.routes[0]).toBe(testRoute);
  });

  it('uses the command line config', async () => {
    const testRoute = 'test-route';
    minimist.mockReturnValue({ routes: testRoute });

    const configuration = config.merge();
    expect(configuration.routes.length).toBe(1);
    expect(configuration.routes[0]).toBe(testRoute);
  });
});
