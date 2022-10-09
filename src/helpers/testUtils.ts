/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import type { Application } from 'express';
import { AuthHeaders } from '$types';

export const authenticate = (headers: AuthHeaders, app: Application, tokens: any) => {
  return (done: jest.DoneCallback) => {
    request(app)
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
};
