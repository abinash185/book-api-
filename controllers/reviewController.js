import Review from '../models/Review.js';

// POST /books/:id/reviews
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const existing = await Review.findOne({ book: req.params.id, user: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already reviewed' });

    const review = await Review.create({
      book: req.params.id,
      user: req.user._id,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /reviews/:id
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
