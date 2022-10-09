import request from 'supertest';
import app from '../app';

describe('PowerAPI endpoints', () => {
  it('Should return welcome message', (done) => {
    request(app)
      .get('/v1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBe(JSON.stringify({ message: 'Welcome to Aploskod integration API!' }));
        return done();
      });
  });
});
