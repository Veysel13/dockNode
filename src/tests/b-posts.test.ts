import request from 'supertest';
import app from '../server/index';
import { testGlobals } from './testGlobals';


describe('Posts API', () => {
  it('POST /api/post - create post successfully', async () => {
    const newPost = {
      title: 'Test Post',
      description: 'DEscription',
    };

    const response = await request(app)
      .post('/api/post')
      .send(newPost)
      .set('Authorization', `Bearer ${testGlobals.authToken}`);

      testGlobals.lastPostId = response.body.data.post.id
      
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.post).toHaveProperty('id');
    expect(response.body.data.post.title).toBe(newPost.title);
  });
});

describe('Posts API', () => {
  it(`PUT /api/post/${testGlobals.lastPostId} - update post successfully`, async () => {
    const updatedData = {
      title: 'Updated Test Post',
    };

    const response = await request(app)
      .put(`/api/post/${testGlobals.lastPostId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.post.title).toBe(updatedData.title);
  });
});
  
describe('Posts API', () => {
  it('GET /api/post - success', async () => {

    const response = await request(app).get('/api/post').set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

/*
describe('Posts API', () => {
  it('DELETE /api/post/id - success', async () => {

    const response = await request(app).delete(`/api/post/${testGlobals.lastPostId}`).set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
*/