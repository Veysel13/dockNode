import express from 'express';
import SinginController from '../../http/controllers/auth/singin-controller';

const router = express.Router();

import schemaValidator from '../../http/middlewares/schema-validator'

router.post("/", [schemaValidator('siginRequestSchema')], SinginController.signin);

export default router;
