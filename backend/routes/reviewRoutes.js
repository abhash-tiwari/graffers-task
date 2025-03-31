const express = require('express');
const { createReview, getCompanyReviews, likeReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:companyId', getCompanyReviews);
router.put('/:id/like', protect, likeReview);

module.exports = router;