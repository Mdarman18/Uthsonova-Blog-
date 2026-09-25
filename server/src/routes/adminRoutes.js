import { Router } from 'express';
import { toggleBlogStatus } from '../controllers/adminBlogController.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.use(protect);

router.patch('/blogs/:id/status', toggleBlogStatus);

export default router;
