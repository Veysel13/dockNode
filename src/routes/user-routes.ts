const express = require('express');
import UserController from '../http/controllers/user-controller';

const router = express.Router();

const userContollerInstance = new UserController();

import schemaValidator from '../http/middleware/schema-validator'


router.post('/user',[schemaValidator('userRequest')], userContollerInstance.createUser);
router.get('/user', userContollerInstance.getAllUser);
router.get('/user/:id', userContollerInstance.getUserById);
router.put('/user/:id', userContollerInstance.updateUser);
router.delete('/user/:id', userContollerInstance.deleteUser);

export default router;