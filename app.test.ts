import req from 'supertest';
import app from './app';

describe('PO Oauth Token', () => {
  test('GET / => should return 200 OK', async () => {
    const response = await req(app).post('/oauth');
    expect(response.status).toBe(200);
  });

  test('POST / => should return tokens', async () => {
    const response = await req(app).post('/oauth');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('refresh_token');
    expect(response.body).toHaveProperty('expires_in');
    expect(response.body).toHaveProperty('token_type');
  });
});
