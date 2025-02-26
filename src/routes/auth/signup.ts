import express from 'express';
import SignupController from '../../http/controllers/auth/signup-controller';

const router = express.Router();

import schemaValidator from '../../http/middlewares/schema-validator'

router.post("/user/signup", [schemaValidator('signupRequestSchema')], SignupController.signup);

export default router;
