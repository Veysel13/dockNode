import cron from 'node-cron';

export const job2 = () => {
  cron.schedule('0 9 * * 1', () => {
    console.log('Job 2 is running every Monday at 9:00 AM!');
  });
};

export default job2;