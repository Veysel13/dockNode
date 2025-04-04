import server from './src/server/index';

if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));

//Workflow
//GraphQl
//post image colomn ekle
//kubernets
//kafka


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


