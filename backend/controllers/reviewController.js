const Review = require('../models/Review');
const Company = require('../models/Company');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { company, rating, subject, reviewText } = req.body;
    
    // Check if company exists
    const companyExists = await Company.findById(company);
    
    if (!companyExists) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    // Check if user already reviewed this company
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      company
    });
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Company already reviewed' });
    }
    
    const review = await Review.create({
      company,
      user: req.user._id,
      rating,
      subject,
      reviewText
    });
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a company
// @route   GET /api/reviews/:companyId
// @access  Public
const getCompanyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ company: req.params.companyId })
      .populate('user', 'fullName')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like a review
// @route   PUT /api/reviews/:id/like
// @access  Private
const likeReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.likes += 1;
    await review.save();
    
    res.json({ likes: review.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, getCompanyReviews, likeReview };