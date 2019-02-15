const Server = require('./Server');
const axios = require('axios');

const testConfig = {
  headless: true
};

const PORT = 1235;

const server = new Server('./test-server', PORT);

describe('Server test', () => {
  it('start the express server (start)', async () => {
    const url = await server.start();
    expect(url).toBe('http://localhost:1235');
  });

  it('closes the server (close)', async () => {
    server.close();
  });

  // it('serves a page', async () => {
  //   const page = `http://localhost:${PORT}/`;
  //   await server.start();
  //   try {
  //     const response = await axios.get(page, { crossdomain: true });
  //     expect(response.data).toContain('hello');
  //   } finally {
  //     await server.close();
  //   }
  // });
});
