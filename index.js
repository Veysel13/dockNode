const dotenv = require('dotenv');

dotenv.config();

const server = require('./src/server');

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));


// https://sequelize.org/docs/v6/getting-started/

// * npm init -y 
// 1) npm install --save sequelize
// 2) npm install --save pg pg-hstore
// 3) npm install --save-dev sequelize-cli
// 4) npx sequelize-cli init   (config,models,migrations,seeders)
// 5) npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// 6) npx sequelize-cli model:generate --name Post --attributes title:string,description:string,user_id:string
