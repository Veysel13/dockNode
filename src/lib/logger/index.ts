import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import dotenv from "dotenv";
import { RabbitMQTransport } from "./rabbitMqTransport";

dotenv.config();

// Log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// (daily logs)
const dailyRotateTransport = new DailyRotateFile({
    filename: path.join(__dirname, "../../storage/logs/app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "5d",
});

// Winston logger
export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Konsola yazdır
        dailyRotateTransport,             // Günlük log dosyası
        new RabbitMQTransport()          // send rabbitmq
    ],
});
