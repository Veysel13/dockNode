const express = require('express');
import UserController from '../http/controllers/user-controller';

const router = express.Router();


import schemaValidator from '../http/middlewares/schema-validator'

router.post('/user',[schemaValidator('userRequest')], UserController.createUser);
router.get('/user', UserController.getAllUser);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

export default router;