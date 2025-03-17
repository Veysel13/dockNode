const express = require('express');
import PostController from '../http/controllers/post-controller';
import { checkPermission } from '../http/middlewares/check-permission';
import { currentUser } from '../http/middlewares/current-user';
import { requireAuth } from '../http/middlewares/require-auth';

const router = express.Router();

import schemaValidator from '../http/middlewares/schema-validator'

router.get('/post', [currentUser, requireAuth, checkPermission('post.view')], PostController.getAll);
router.post('/post', [schemaValidator('postRequest'), currentUser, requireAuth, checkPermission('post.create')], PostController.create);
router.get('/post/:id', [currentUser, requireAuth, checkPermission('post.view')], PostController.find);
router.put('/post/:id', [currentUser, requireAuth, checkPermission('post.update')], PostController.update);
router.delete('/post/:id', [currentUser, requireAuth, checkPermission('post.delete')], PostController.delete);

export default router;