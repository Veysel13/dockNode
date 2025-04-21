import server from './src/server/index';

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
}

const PORT = process.env.PORT || 3000;
const ENV  = process.env.ENVIRONMENT || 'local';

if(ENV == 'production')
server.listen(PORT, '0.0.0.0', () => console.log(`Server is live at localhost:${PORT}`));
else
server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));

//Workflow

//multer dosya yükleme, local veya aws disk seçimi
//grpc ve microservice, ddd yapıları
//kafka
//kubernets

/*
NestJS benzeri syntax oluşturabiliriz:

ts
Kopyala
Düzenle
@RequirePermission("create_post")
router.post("/post", createPost);
*/

//Erişimler
// http://localhost:5050/browser/ -> pgadmin database
// http://localhost:15672/#/queues -> rabbit mq


// https://sequelize.org/docs/v6/getting-started/

// * npm init -y 
// 1) npm install --save sequelize
// 2) npm install --save pg pg-hstore
// 3) npm install --save-dev sequelize-cli
// 4) npx sequelize-cli init   (config,models,migrations,seeders)
// 5) npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// 6) npx sequelize-cli model:generate --name Post --attributes title:string,description:string,user_id:string

// type script

// npm install --save-dev typescript ts-node @types/node
// npx tsc --init





