import { logger } from "../lib/logger";
import { emitter } from "./emitter";


export function userEvents() {
    emitter.on("user:created", (user) => {
        logger.info(`Yeni kullanıcı: ${user.email}`);
    });


    emitter.on("user:updated", (user) => {
        logger.info(`Kullanıcı güncellendi: ${user.email}`);
    });

    emitter.on("user:deleted", (user) => {
        logger.info(`kullanıcı silindi: ${user.email}`);
    });
}


