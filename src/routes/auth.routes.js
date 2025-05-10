import { Router } from "express";

import AuthController from "../controllers/AuthController.js";
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../validations/authValidation.js';

const router = new Router();

router.post('/login', validate('body', loginSchema), AuthController.login);

export default router;