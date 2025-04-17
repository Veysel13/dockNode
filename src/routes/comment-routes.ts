const express = require('express');
import CommentController from '../http/controllers/comment-controller';
import { checkPermission } from '../http/middlewares/check-permission';
import { currentUser } from '../http/middlewares/current-user';
import { requireAuth } from '../http/middlewares/require-auth';

const router = express.Router();

import schemaValidator from '../http/middlewares/schema-validator'

router.post('/comment',[currentUser, requireAuth, schemaValidator('commentRequest'), checkPermission('comment.create')], CommentController.create);
router.get('/comment', [currentUser, requireAuth, checkPermission('comment.view')], CommentController.getAll);
router.get('/comment/:id', [currentUser, requireAuth, checkPermission('comment.view')], CommentController.find);
router.put('/comment/:id', [currentUser, requireAuth, schemaValidator('commentUpdateRequest'), checkPermission('comment.update')], CommentController.update);
router.delete('/comment/:id', [currentUser, requireAuth, checkPermission('comment.delete')], CommentController.delete);

export default router;