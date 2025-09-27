import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;
