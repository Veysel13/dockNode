import { Worker } from 'bullmq';
import redis from '../../config/redis';
import Post from '../../models/post';

export const postWorker = new Worker(
  'postQueue',
  async (job) => {
    await Post.create(job.data);
    console.log('✅ Yeni post veritabanına eklendi:', job.data.title);
  },
  { connection: redis }
);
