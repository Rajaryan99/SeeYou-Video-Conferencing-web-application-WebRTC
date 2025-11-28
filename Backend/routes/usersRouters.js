import { Router } from "express";

const router = Router();

router.route('/login');
router.route('/register');
router.route('/addToActivity');
router.route('/getAllActivity');

export default router;