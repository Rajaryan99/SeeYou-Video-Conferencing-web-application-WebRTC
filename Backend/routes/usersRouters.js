import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const router = Router();

router.route('/login');
router.route('/register').post(register);
router.route('/addToActivity');
router.route('/getAllActivity');

export default router;