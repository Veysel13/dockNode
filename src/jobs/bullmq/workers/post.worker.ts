import { Worker } from 'bullmq';
import redis from '../../../config/redis';

export const postWorker = new Worker(
  'postQueue',
  async (job) => {
    console.log('✅ Yeni post veritabanına eklendi:', job.data);
  },
  { connection: redis }
);
