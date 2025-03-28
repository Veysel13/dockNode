import { Request, Response, NextFunction } from "express";
import { logger } from "../../lib/logger";


export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`[${req.method}] ${req.url}`);
    next();
};
