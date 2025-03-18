import amqp from "amqplib";
import fs from "fs";
import path from "path";
import { BaseJob } from "../../jobs/BaseJob";

const WORKER_COUNT = 3;
const RABBITMQ_URL:string = process.env.RABBITMQ_URL || "amqp://localhost"

async function loadJobs(): Promise<BaseJob[]> {
    const jobs: BaseJob[] = [];
    const jobFiles = fs.readdirSync(path.join(__dirname, "../../jobs"));
  
    for (const file of jobFiles) {
      if (file !== "BaseJob.ts" && file.endsWith(".ts")) {
        const jobModule = await import(`../../jobs/${file.replace(".ts", "")}`);
        const JobClass = Object.values(jobModule)[0] as { new (): BaseJob };  
        jobs.push(new JobClass());
      }
    }
  
    return jobs;
  }

async function startWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel    = await connection.createChannel();
    const jobs       = await loadJobs();

    for (const job of jobs) {
      await channel.assertQueue(job.queueName, { durable: true });
      console.log(`Waiting for messages in "${job.queueName}"...`);

      for (let i = 0; i < WORKER_COUNT; i++) {
        channel.consume(
            job.queueName,
            async (msg) => {
            if (msg) {
                const data = JSON.parse(msg.content.toString());
                console.log(`Received message in ${job.queueName}:`, data);
                await job.process(data);
                channel.ack(msg);
            }
            },
            { noAck: false }
        );
      }
    }
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
}

startWorker();
