import { FaStar, FaThumbsUp } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

const ReviewCard = ({ review, user }) => {
  const [likes, setLikes] = useState(review.likes);
  
  const handleLike = async () => {
    if (!user) return;
    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.put(
        `https://graffers-task.onrender.com/api/reviews/${review._id}/like`,
        {},
        config
      );
      
      setLikes(data.likes);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{review.subject}</h3>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
          ))}
        </div>
      </div>
      
      <div className="mt-2 text-sm text-gray-700">{review.reviewText}</div>
      
      <div className="mt-3 flex justify-between items-center text-sm">
        <div className="text-gray-500">
          By: {review.user?.fullName || 'Anonymous'} • {new Date(review.createdAt).toLocaleDateString()}
        </div>
        
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${
            user ? 'hover:bg-gray-100' : 'cursor-not-allowed opacity-50'
          }`}
        >
          <FaThumbsUp className="text-blue-500" />
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;