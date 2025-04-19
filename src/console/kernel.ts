
import fs from 'fs';
import path from 'path';

// Dinamik olarak job dosyalarını yükleyip çalıştırma
export const scheduleCronJobs = () => {
  const jobDirectory = path.join(__dirname, './command');
  
  fs.readdirSync(jobDirectory).forEach((file) => {
    if (file.endsWith('.ts')) {
      const job = require(path.join(jobDirectory, file)).default;
      job();
    }
  });
};
