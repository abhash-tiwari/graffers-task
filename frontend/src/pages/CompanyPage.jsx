import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import ReviewCard from '../components/ReviewCard';

const CompanyPage = ({ user }) => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCompanyAndReviews = async () => {
      try {
        const [companyRes, reviewsRes] = await Promise.all([
          axios.get(`https://graffers-task.onrender.com/api/companies/${id}`),
          axios.get(`https://graffers-task.onrender.com/api/reviews/${id}`)
        ]);
        
        setCompany(companyRes.data);
        setReviews(reviewsRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchCompanyAndReviews();
  }, [id]);
  
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }
  
  if (!company) {
    return <div className="text-center py-8 text-red-600">Company not found</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex">
          <div className="w-24 h-24 mr-6">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-3xl font-bold">
                {company.name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">{company.name}</h1>
            
            <div className="text-sm text-gray-600 mt-1">
              {company.address.street}, {company.address.area}, {company.address.city} ({company.address.state})
            </div>
            
            <div className="flex items-center mt-3">
              <div className="text-xl font-semibold mr-2">{company.averageRating}</div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-2xl ${
                      index < Math.floor(company.averageRating) ? 'text-yellow-400' : 'text-gray-300'
                    } ${
                      index === Math.floor(company.averageRating) && 
                      company.averageRating % 1 > 0 ? 'text-yellow-400 opacity-60' : ''
                    }`}
                  />
                ))}
              </div>
              <div className="ml-2 text-gray-600">{company.totalReviews} Reviews</div>
            </div>
            
            {company.description && (
              <div className="mt-4 text-gray-700">
                <h3 className="font-semibold mb-1">About</h3>
                <p>{company.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {user ? (
          <Link
            to={`/add-review/${company._id}`}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Write a Review
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
          >
            Login to Review
          </Link>
        )}
      </div>
      
      {reviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-600">
          No reviews yet. Be the first to review this company!
        </div>
      ) : (
        <div>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyPage;
