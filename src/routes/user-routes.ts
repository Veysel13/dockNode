const express = require('express');
import UserController from '../http/controllers/user-controller';

const router = express.Router();


import schemaValidator from '../http/middlewares/schema-validator'

router.post('/user',[schemaValidator('userRequest')], UserController.create);
router.get('/user', UserController.getAll);
router.get('/user/:id', UserController.find);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;