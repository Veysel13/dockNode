
import { Response } from "express";

export const successResponse = (res: Response, status: number = 200, message: string, data: any[] = []) => {
    res.status(status).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res: Response, status: number = 500, errors: any[]= []) => {
    res.status(status).json({
        success: false,
        errors
    });
};
