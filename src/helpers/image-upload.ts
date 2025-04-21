'use strict';

import { uploadSingleImage } from "../lib/multer";
import { Request, Response } from "express";

const path = require('path');
const fs = require('fs')

class ImageUpload {

   static async uploadBase64Image(imgData:string, filePath:string = 'avatars') {

        if (imgData) {
            
            const fileName = Date.now() + '.png'

            const uploadPath = path.join(__dirname, '../storage/uploads')+'/'+filePath 

            fs.mkdirSync(uploadPath, { recursive: true });

            const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

            fs.writeFileSync(uploadPath+ '/' + fileName, base64Data, { encoding: 'base64' });

            return filePath+'/'+fileName
        } else {
            return null
        }
    }

    static async uploadImage(req: Request, res: Response): Promise<string | null> {
        try {
          const filePath = await uploadSingleImage(req, res);
          return filePath;
        } catch (err) {
          console.error("Upload error:", err);
          return null;
        }
      }
}

export default ImageUpload;