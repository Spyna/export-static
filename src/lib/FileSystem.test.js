jest.mock('fs-extra', () => ({
  removeSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirsSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn()
}));
jest.mock('copy-dir', () => ({
  sync: (source, target, exclude) => {
    expect(target).toBe('test-export-dir');
    expect(source).toBe('test-source-dir');
    expect(exclude('', '', 'not-matched.pdf')).toBeTruthy()
    expect(exclude('', '', '404.html')).toBeTruthy()
    expect(exclude('', '', 'page.html')).toBeFalsy()
  }
}));
const fs = require('fs-extra');
const path = require('path');

const FileSystem = require('./FileSystem');

const testConfig = {
  exportDir: 'test-export-dir',
  sourceDir: 'test-source-dir',
  clean: true
};

const fileSystem = new FileSystem(testConfig);

describe('FileSystem test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('it cleans the export dir', async () => {
    fileSystem.cleanExportDir();

    expect(fs.removeSync.mock.calls.length).toBe(1);
    expect(fs.removeSync.mock.calls[0][0]).toBe(testConfig.exportDir);
  });

  it('it does not clean the export dir', async () => {
    new FileSystem({clean:false}).cleanExportDir();

    expect(fs.removeSync.mock.calls.length).toBe(0);
  });

  it('it copies all resource from source dir to export dir (copyResources)', async () => {
    fileSystem.copyResources();
  });

  it('writes a file when folder already exists (writeFile)', async () => {
    const source = 'file content';
    const folder = 'test-folder';

    const destFolder = path.join(testConfig.exportDir, folder);
    fs.existsSync.mockImplementation(name => {
      expect(name).toBe(destFolder);
      return true;
    });

    fileSystem.writeFile(source, folder);

    expect(fs.writeFileSync.mock.calls.length).toBe(1);
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(
      path.join(destFolder, 'index.html')
    );
    expect(fs.writeFileSync.mock.calls[0][1]).toBeInstanceOf(Buffer);
  });

  
  it('writes a file when folder does not exists exists (writeFile)', async () => {
    const source = 'file content';
    const folder = 'test-folder';
    
    const destFolder = path.join(testConfig.exportDir, folder);
    fs.existsSync.mockImplementation(name => {
      expect(name).toBe(destFolder);
      return false;
    });
    
    fileSystem.writeFile(source, folder);
    
    expect(fs.mkdirsSync.mock.calls.length).toBe(1);
    expect(fs.mkdirsSync.mock.calls[0][0]).toBe(destFolder);
    
    expect(fs.writeFileSync.mock.calls.length).toBe(1);
    expect(fs.writeFileSync.mock.calls[0][0]).toBe(
      path.join(destFolder, 'index.html')
      );
      expect(fs.writeFileSync.mock.calls[0][1]).toBeInstanceOf(Buffer);
    });

    it('writes a file in a nested folder (writeFile)', async () => {
      const source = 'file content';
      const folder = 'a/nested/page.html';
  
      const destFolder = path.join(testConfig.exportDir, 'a/nested');
      fs.existsSync.mockImplementation(name => {
        expect(name).toBe(destFolder);
        return true;
      });
  
      fileSystem.writeFile(source, folder);
  
      expect(fs.writeFileSync.mock.calls.length).toBe(1);
      expect(fs.writeFileSync.mock.calls[0][0]).toBe(
        path.join(destFolder, 'page.html')
      );
      expect(fs.writeFileSync.mock.calls[0][1]).toBeInstanceOf(Buffer);
    });
    
  it('creates the export dir if does not exist (createExportDir)', async () => {
    const source = 'file content';
    const folder = 'test-folder';

    fs.existsSync.mockImplementation(name => {
      expect(name).toBe(testConfig.exportDir);
      return false;
    });

    fileSystem.createExportDir(source, folder);

    expect(fs.mkdirSync.mock.calls.length).toBe(1);
    expect(fs.mkdirSync.mock.calls[0][0]).toBe(testConfig.exportDir);
  });

  it('does nothing if the export dir exists (createExportDir)', async () => {
    const source = 'file content';
    const folder = 'test-folder';

    fs.existsSync.mockImplementation(name => {
      expect(name).toBe(testConfig.exportDir);
      return true;
    });

    fileSystem.createExportDir(source, folder);

    expect(fs.mkdirSync.mock.calls.length).toBe(0);
  });
});
