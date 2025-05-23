const express = require('express');
import {Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
const cors = require('cors');
require('../models/index.ts')
import path from 'path';
import i18n from '../config/i18n';
import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/schema";
import { scheduleCronJobs } from '../console/kernel';
import '../jobs/bullmq';
import "../events/loadEvents"
import { registerObservers } from "../observers/index";

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// i18n init
app.use(i18n.init);
app.use(function (req:Request, res:Response, next:NextFunction) {
    if (req.header('lang') && req.header('lang') != i18n.getLocale()){
        i18n.setLocale(req, req.header('lang'))
    } 
    next()
});
// i18n init

//app.use(express.static(path.join(__dirname, '../storage/uploads')))
app.use('/uploads', express.static(path.join(__dirname, '../storage/uploads')));
//http://localhost:3000/uploads/posts/1744213411482.png

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

import errorHandler from '../http/middlewares/error-handler';
import { NotFoundError } from '../errors/not-found-error';
import maintance from '../http/middlewares/maintance';
import { apiLimiter, signInLimiter, signUpLimiter } from '../http/middlewares/security/rateLimiter';
import { securityHeaders } from '../http/middlewares/security/helmet';

import signUpRoutes from '../routes/auth/signup';
import signInRoutes from '../routes/auth/signin';
import userRoutes from '../routes/user-routes';
import postRoutes from '../routes/post-routes';
import commentRoutes from '../routes/comment-routes';
import { logMiddleware } from '../http/middlewares/request-log';



//Middlewares

//app.use(express.json());
app.use(json());
//app.set('trust proxy', true);
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(securityHeaders);
app.use(apiLimiter);

scheduleCronJobs();
registerObservers();

//app.use(logMiddleware);

//Routes

//Maintance
app.use(maintance)

app.use('/api/signup', signUpLimiter, signUpRoutes);
app.use('/api/signin', signInLimiter, signInRoutes)
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);

try {
    app.use(
        "/graphql",
        graphqlHTTP((req, res) => ({
          schema,
          graphiql: true,
          context: { req, res },
        }))
      );
} catch (error) {
    throw new Error('');
}

app.all('*', async (req:any, res:any) => {
    throw new NotFoundError();
});

app.use(errorHandler)

export default app;

// https://sequelize.org/docs/v6/getting-started/

// * npm init -y 
// 1) npm install --save sequelize
// 2) npm install --save pg pg-hstore
// 3) npm install --save-dev sequelize-cli
// 4) npx sequelize-cli init   (config,models,migrations,seeders)
// 5) npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// 6) npx sequelize-cli model:generate --name Post --attributes title:string,description:string,user_id:string
