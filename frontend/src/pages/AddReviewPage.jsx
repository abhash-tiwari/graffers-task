import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const AddReviewPage = ({ user }) => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const [company, setCompany] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [subject, setSubject] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get(
          `https://graffers-task.onrender.com/api/companies/${companyId}`
        );
        setCompany(data);
        setFetchLoading(false);
      } catch (error) {
        console.error(error);
        setFetchLoading(false);
      }
    };
    
    fetchCompany();
  }, [companyId]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!rating || !subject || !reviewText) {
      setError('Please fill in all fields and provide a rating');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      await axios.post(
        'https://graffers-task.onrender.com/api/reviews',
        {
          company: companyId,
          rating,
          subject,
          reviewText,
        },
        config
      );
      
      navigate(`/company/${companyId}`);
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An error occurred while adding the review'
      );
    } finally {
      setLoading(false);
    }
  };
  
  if (fetchLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (!company) {
    return <div className="text-center py-8 text-red-600">Company not found</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-2">Write a Review</h1>
      <h2 className="text-center text-lg text-gray-600 mb-6">for {company.name}</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={submitHandler}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-center">
            Your Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex justify-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              
              return (
                <label key={index} className="cursor-pointer mx-1">
                  <input
                    type="radio"
                    name="rating"
                    className="hidden"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="text-3xl"
                    color={ratingValue <= (hover || rating) ? '#FFC107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
          <div className="text-center mt-2 text-gray-600">
            {rating === 0 ? 'Select a rating' : `You rated: ${rating} star${rating > 1 ? 's' : ''}`}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subject">
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Summarize your experience"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="reviewText">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="reviewText"
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Tell others about your experience with this company"
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/company/${companyId}`)}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewPage;