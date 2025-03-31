const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  reviewText: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

reviewSchema.post('save', async function() {
    const Review = this.constructor;
    const Company = mongoose.model('Company');
    
    const stats = await Review.aggregate([
      { $match: { company: this.company } },
      { 
        $group: { 
          _id: '$company', 
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        } 
      }
    ]);
    
    if (stats.length > 0) {
      await Company.findByIdAndUpdate(this.company, {
        averageRating: stats[0].avgRating.toFixed(1),
        totalReviews: stats[0].count
      });
    }
  });
  
  module.exports = mongoose.model('Review', reviewSchema);