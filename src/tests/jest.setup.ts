import request from 'supertest';
import app from '../server/index';
import { testGlobals } from './testGlobals';

jest.mock('ioredis', () => {
    return jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(),
        connect: jest.fn(),
        get: jest.fn(),
        set: jest.fn(),
      };
    });
  });

beforeAll(async () => {
const response = await request(app)
    .post('/api/user/signin')
    .send({
    email: 'veysel.ffwssss1s2s2@gmail.com',
    password: '123456789',
    });

testGlobals.authToken = response.body.token;
});



  
  