const express = require('express');
import PostController from '../http/controllers/post-controller';
import { currentUser } from '../http/middlewares/current-user';
import { requireAuth } from '../http/middlewares/require-auth';

const router = express.Router();

import schemaValidator from '../http/middlewares/schema-validator'

router.post('/post', [schemaValidator('postRequest'), currentUser, requireAuth], PostController.create);
router.get('/post', [currentUser, requireAuth], PostController.getAll);
router.get('/post/:id', [currentUser, requireAuth], PostController.find);
router.put('/post/:id', [currentUser, requireAuth], PostController.update);
router.delete('/post/:id', [currentUser, requireAuth], PostController.delete);

export default router;