import request from 'supertest';
import app from '../server/index';
import { testGlobals, createTestPost } from './testGlobals';

beforeAll(async () => {
  await createTestPost();
});

describe('Posts API', () => {
  it('POST /api/comment - create post successfully', async () => {
    const newComment = {
      rating: 4,
      description: 'DEscription',
      postId:testGlobals.lastPostId
    };

    const response = await request(app)
      .post('/api/comment')
      .send(newComment)
      .set('Authorization', `Bearer ${testGlobals.authToken}`);

      testGlobals.lastCommentId = response.body.data.comment.id
      
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.comment).toHaveProperty('id');
    expect(response.body.data.comment.rating).toBe(newComment.rating);
  });
});


describe('Posts API', () => {
  it(`PUT /api/comment/${testGlobals.lastCommentId} - update post successfully`, async () => {
    const updatedData = {
      rating:4,
      description: 'Updated Test Post upd',
    };

    const response = await request(app)
      .put(`/api/comment/${testGlobals.lastCommentId}`)
      .send(updatedData)
      .set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});


describe('Posts API', () => {
  it('GET /api/comment - success', async () => {

    const response = await request(app).get('/api/comment').set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});


describe('Posts API', () => {
  it('DELETE /api/comment/id - success', async () => {

    const response = await request(app).delete(`/api/comment/${testGlobals.lastCommentId}`).set('Authorization', `Bearer ${testGlobals.authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});