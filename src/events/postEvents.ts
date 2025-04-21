import { addPostToQueue } from "../jobs/bullmq/queues/post.queue";
import { logger } from "../lib/logger";
import sendToQueue from "../lib/rabbitmq/producer";
import { emitter } from "./emitter";


export function postEvents() {
    emitter.on("post:created", async (post) => {
        logger.info(`Yeni Post: ${post.title}`);
        //rabbit mq
        await sendToQueue('post_queue', post);
        //queue
        await addPostToQueue(post);
    });


    emitter.on("post:updated", (post) => {
        logger.info(`Post güncellendi: ${post.title}`);
    });

    emitter.on("post:deleted", (post) => {
        logger.info(`Post silindi: ${post.id}`);
    });
}


