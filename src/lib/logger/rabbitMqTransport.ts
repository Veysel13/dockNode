import Transport from "winston-transport";
import amqplib from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const QUEUE_NAME = "logs";

export class RabbitMQTransport extends Transport {
    private channel: amqplib.Channel | null = null;

    constructor(opts?: any) {
        super(opts);
        this.connect();
    }

    async connect() {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        try {
            const connection = await amqplib.connect(RABBITMQ_URL);
            this.channel = await connection.createChannel();
            await this.channel.assertQueue(QUEUE_NAME, { durable: true });
            console.log("✅ RabbitMQ'ya bağlandı, log kuyruğu oluşturuldu.");
        } catch (error) {
            console.error("❌ RabbitMQ bağlantı hatası:", error);
        }
    }

    async log(info: any, callback: () => void) {
        if (process.env.NODE_ENV === 'test') {
            return;
        }
        
        if (!this.channel) {
            console.error("❌ RabbitMQ bağlantısı yok, log gönderilemedi.");
            return callback();
        }

        if (info.level !== "error") {
            return callback();
        }

        const logMessage = JSON.stringify({ level: info.level, message: info.message, timestamp: new Date() });

        this.channel.sendToQueue(QUEUE_NAME, Buffer.from(logMessage));
        console.log("📤 RabbitMQ'ya log gönderildi:", logMessage);

        callback();
    }
}
