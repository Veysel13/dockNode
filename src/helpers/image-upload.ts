'use strict';

const path = require('path');
const fs = require('fs')

class ImageUpload {

   static async upload(imgData:string, filePath:string = 'avatars') {

        if (imgData) {
            const fileName = Date.now() + '.png'

            const uploadPath = path.join(__dirname, '../../storage/uploads')+'/'+filePath 

            fs.mkdirSync(uploadPath, { recursive: true });

            const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');

            fs.writeFileSync(uploadPath+ '/' + fileName, base64Data, { encoding: 'base64' });

            return filePath+'/'+fileName
        } else {
            return ''
        }
    }
}

export default ImageUpload;