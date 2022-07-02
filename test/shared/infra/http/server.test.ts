import request from 'supertest';
import Server from '../../../../src/shared/infra/http/server';

describe('Testing over the Server.ts file', () => {
  let server: Server;
  beforeAll(() => {
    server = new Server(process.env.PORT || '9000');
    server.listen();
  });

  afterAll(() => {
    server.stop();
  });

  test('Test the / endpoint with a GET request', async () => {
    const result = await request(server.getHTTPServer()).get('/api/v1/');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(
      expect.objectContaining({ message: expect.any(String) })
    );
  });
});
