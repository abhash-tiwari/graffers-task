import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const CompanyCard = ({ company }) => {
  return (
    <div className="border border-gray-200 rounded-md p-4 mb-4 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-start">
        <div className="w-20 h-20 mr-4">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-bold">
              {company.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
            <div className="text-sm text-gray-500">
              Founded on {new Date(company.foundedOn).toLocaleDateString()}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mt-1">
            {company.address.street}, {company.address.area}, {company.address.city} ({company.address.state})
          </div>
          
          <div className="flex items-center mt-2">
            <div className="font-semibold mr-2">{company.averageRating}</div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${index < Math.floor(company.averageRating) ? 'text-yellow-400' : 'text-gray-300'} ${
                    index === Math.floor(company.averageRating) && 
                    company.averageRating % 1 > 0 ? 'text-yellow-400 opacity-60' : ''
                  }`}
                />
              ))}
            </div>
            <div className="ml-2 text-sm text-gray-600">{company.totalReviews} Reviews</div>
          </div>
        </div>
        
        <Link
          to={`/company/${company._id}`}
          className="ml-4 py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300 text-sm"
        >
          Detail Review
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;