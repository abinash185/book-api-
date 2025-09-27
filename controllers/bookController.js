import Book from '../models/Book.js';
import Review from '../models/Review.js';

// POST /books
export const addBook = async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books
export const getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = genre;

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books/:id
export const getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    res.json({ book, avgRating, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /search?q=
export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    const books = await Book.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { author: new RegExp(q, 'i') }
      ]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
