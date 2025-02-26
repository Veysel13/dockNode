const express = require('express');
import CommentController from '../http/controllers/comment-controller';
import { currentUser } from '../http/middlewares/current-user';
import { requireAuth } from '../http/middlewares/require-auth';

const router = express.Router();

import schemaValidator from '../http/middlewares/schema-validator'

router.post('/comment',[schemaValidator('commentRequest'), currentUser, requireAuth], CommentController.create);
router.get('/comment', [currentUser, requireAuth], CommentController.getAll);
router.get('/comment/:id', [currentUser, requireAuth], CommentController.find);
router.put('/comment/:id', [currentUser, requireAuth], [schemaValidator('commentRequest')], CommentController.update);
router.delete('/comment/:id', [currentUser, requireAuth], CommentController.delete);

export default router;