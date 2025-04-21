import multer from "multer";
import path from "path";
import { Request, Response } from "express";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
      cb(null, path.join(__dirname, "../../storage/uploads"));
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });

const fileFilter = (req:Request, file:Express.Multer.File, cb:multer.FileFilterCallback) => {
        const allowedFileTypes = /jpeg|jpg|png|gif/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Yalnızca .jpeg, .jpg, .png ve .gif formatındaki resim dosyaları yüklenebilir!'));
        }
    };

const upload = multer({ storage, fileFilter });

export const uploadSingleImage = async (req: Request, res: Response): Promise<string> => {
    return new Promise((resolve, reject) => {
      const singleUpload = upload.single("image");
    
  
      singleUpload(req, res, function (err:any) {
        
        if (err) {
            console.log('err', err);
            
          return reject(err);
        }
        console.log('req.file:', req);
        const filePath = req.file?.filename ? `/new/${req.file.filename}` : null;
        resolve(filePath || "");
      });
    });
  };
