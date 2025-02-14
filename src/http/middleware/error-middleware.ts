import { Request, Response, NextFunction } from "express";

// Hata nesnesi için özel bir interface tanımlıyoruz
interface CustomError extends Error {
    statusCode?: number;
    keyValue?: Record<string, string>;
    code?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 11000 && err.keyValue) {
        return res.status(400).json({
            statusCode: 400,
            message: `${Object.keys(err.keyValue)} için girilen ${Object.values(err.keyValue)} değer daha önceden girilmiş.`,
            data: {},
        });
    } else if (err.statusCode === 505) {
        return res.status(200).json({
            statusCode: 200,
            message: "Sistem bakımda",
            maintance: 1,
            data: {},
        });
    }

    res.status(err.statusCode || 400).json({
        statusCode: err.statusCode || 400,
        message: err.message || "Bilinmeyen bir hata oluştu",
        data: {},
    });
};

export default errorHandler;
