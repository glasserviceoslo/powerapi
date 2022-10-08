import request from 'supertest';
import app from '../app';

describe('suite', () => {
  it('serial test', async () => {
    request(app).get('/v1').expect(200);
  });
});
