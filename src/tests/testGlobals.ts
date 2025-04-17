import request from 'supertest';
import app from '../server/index';

export const testGlobals = {
    authToken: '',
    lastPostId: 0,
    lastCommentId: 0
};

export const createTestPost = async () => {
    if (testGlobals.lastPostId !== 0) return;

    const response = await request(app)
        .post('/api/post')
        .send({ title: 'Test Post', description: 'desc' })
        .set('Authorization', `Bearer ${testGlobals.authToken}`);

    testGlobals.lastPostId = response.body.data.post.id;
};