import { Queue } from 'bullmq';
import redis from '../../config/redis';

export const emailQueue = new Queue('emailQueue', {
  connection: redis,
});

export async function addEmailToQueue(data: { to: string; subject: string }) {
  await emailQueue.add('sendEmail', data, {
    attempts: 3, // 3 kez retry etsin
    backoff: { type: 'exponential', delay: 3000 }, // 3sn gecikmeli retry
  });
}
