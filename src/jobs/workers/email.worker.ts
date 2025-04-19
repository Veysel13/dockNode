import { Worker } from 'bullmq';
import redis from '../../config/redis';

export const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    console.log('Email job started:', job.name);
    const { to, subject } = job.data;

    // Burada gerçek e-posta işlemini yapabilirsin
    console.log(`📧 Sending email to ${to} with subject "${subject}"`);

    // Simülasyon
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('✅ Email sent!');
  },
  { connection: redis }
);
