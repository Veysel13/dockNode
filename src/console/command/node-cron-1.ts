import cron from 'node-cron';

export const job1 = () => {
  cron.schedule('* * * * *', () => {
    console.log('Job 1 is running every minute!');
  });
};

export default job1;
