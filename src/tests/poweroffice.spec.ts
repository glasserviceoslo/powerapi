import supertest from 'supertest';
import { AuthHeaders, ITokenResponse } from '$types';
import app from '../app';

const request = supertest(app);

const authenticate = (headers: AuthHeaders, tokens: any) => (done: jest.DoneCallback) => {
  request
    .post('/v1/poweroffice/oauth')
    .set('Application_key', headers.appKey)
    .set('Client_key', headers.clientKey)
    .expect(201)
    .end((err, res) => {
      if (err) return done(err);
      Object.assign(tokens, JSON.parse(res.text));
      return done();
    });
};

describe('SuiteCRM routes', () => {
  const tokens = {} as ITokenResponse;

  const headers = {
    appKey: process.env.PO_APP_KEY,
    clientKey: process.env.PO_CLIENT_KEY,
  };

  beforeAll(authenticate(headers, tokens));
  afterAll(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  });

  it('Should return welcome message', (done) => {
    request
      .get('/v1/poweroffice/customers')
      .set('access_token', tokens.access_token)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(
          '🚀 ~ file: poweroffice.spec.ts ~ line 48 ~ .end ~ res',
          res.text,
        );
        return done();
      });
  });
});
