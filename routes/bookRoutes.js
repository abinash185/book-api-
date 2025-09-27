import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { addBook, getBooks, getBookDetails, searchBooks } from '../controllers/bookController.js';
import { addReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', protect, addBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookDetails);
router.post('/:id/reviews', protect, addReview);

export default router;
