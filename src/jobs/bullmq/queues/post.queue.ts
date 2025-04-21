import { Queue } from 'bullmq';
import redis from '../../../config/redis';

export const postQueue = new Queue('postQueue', {
  connection: redis,
});

export const addPostToQueue = async (data: any) => {
  await postQueue.add('createPost', data);
};
