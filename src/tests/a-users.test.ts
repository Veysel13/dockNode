import request from 'supertest';
import app from '../server/index';

describe('Dummy Test', () => {
  it('should pass successfully', () => {
    expect(true).toBe(true);
  });
});

/*
describe('Users API', () => {
  it('POST /api/user/signup - create user successfully', async () => {
    const newUser = {
      name: 'Test',
      lastname: 'User',
      email: 'test1s3s332e23@example.com',
      password: 'securepassword',
    };

    const response = await request(app)
      .post('/api/user/signup')
      .send(newUser);
      
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('id');
    expect(response.body.data.user.name).toBe(newUser.name);
  });
});
*/

describe('Users API', () => {
  it('PUT /api/user/3 - update user successfully', async () => {
    const updatedData = {
      name: 'Updated',
      lastname: 'Test User'
    };

    const response = await request(app)
      .put('/api/user/3')
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user.name).toBe(updatedData.name);
  });
});

  
describe('Users API', () => {
  it('GET /api/user - success', async () => {
    const response = await request(app).get('/api/user');
  
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe('Users API', () => {
  it('GET /api/user/3 - success', async () => {
    const response = await request(app).get('/api/user/3');
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});