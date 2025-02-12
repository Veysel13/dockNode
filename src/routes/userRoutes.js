const express = require('express');
const userContoller = require('../http/controllers/userController.js');

const router = express.Router();

router.post('/user', userContoller.createUser);
router.get('/user', userContoller.getAllUser);
router.get('/user/:id', userContoller.getUserById);
router.put('/user/:id', userContoller.updateUser);
router.delete('/user/:id', userContoller.deleteUser);

module.exports=router;