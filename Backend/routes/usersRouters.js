import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";

const router = Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/addToActivity');
router.route('/getAllActivity');

export default router;