import express from "express";
import amqp from "amqplib";

const app = express();
app.use(express.json());

const RABBITMQ_URL:string = process.env.RABBITMQ_URL || "amqp://localhost";

async function sendToQueue(queueName: string, message: object) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`Message sent to ${queueName}:`, message);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

export default sendToQueue;

