const express = require('express');
import 'express-async-errors';
const cors = require('cors');

const app = express();
import errorHandler from '../http/middlewares/error-handler';
import { NotFoundError } from '../errors/not-found-error';


import userRoutes from '../routes/user-routes';

//Middlewares
app.use(express.json());
app.set('trust proxy', true);
app.use(express.urlencoded({extended:true}))
app.use(cors())

//Routes
app.use('/api', userRoutes);

app.all('*', async (req:any, res:any) => {
    throw new NotFoundError();
});

app.use(errorHandler)


//module.exports = app; (require ile kullanım)
export default app;


// https://sequelize.org/docs/v6/getting-started/

// * npm init -y 
// 1) npm install --save sequelize
// 2) npm install --save pg pg-hstore
// 3) npm install --save-dev sequelize-cli
// 4) npx sequelize-cli init   (config,models,migrations,seeders)
// 5) npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// 6) npx sequelize-cli model:generate --name Post --attributes title:string,description:string,user_id:string
