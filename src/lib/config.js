const path = require('path');
const fs = require('fs-extra');
const minimist = require('minimist');

const defaultConfig = {
  routes: ['/'],
  port: 7890,
  exportDir: 'export',
  sourceDir: 'build',
  clean: true,
  browser: {
    headless: true
  }
};

const CONFIG_FILE_NAME = 'export.static.config.js';

const getUserConfig = (configFileNName = CONFIG_FILE_NAME) => {
  const configFile = path.join(process.cwd(), configFileNName);
  const userConfigExists = fs.existsSync(configFile);
  return userConfigExists ? require(configFile) : {};
};

const getCommandLineConfig = () => {
  const argv = minimist(process.argv.slice(2));
  const { port, routes, exportDir, sourceDir } = argv;
  const config = {
    routes: routes ? routes.split(' ') : undefined,
    port,
    exportDir,
    sourceDir
  };
  Object.keys(config).forEach(key =>
    config[key] === undefined ? delete config[key] : ''
  );
  return config;
};

module.exports = {
  merge: customConfig => {
    if (customConfig) {
      return {
        ...defaultConfig,
        ...customConfig
      };
    }
    let commandLineConfig = getCommandLineConfig();
    let userConfig = getUserConfig(commandLineConfig.config);
    return {
      ...defaultConfig,
      ...userConfig,
      ...commandLineConfig
    };
  }
};
