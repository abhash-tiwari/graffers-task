import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CompanyCard from '../components/CompanyCard';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('name');
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const params = new URLSearchParams();
        if (city) params.append('city', city);
        if (sort) params.append('sort', sort);
        
        const { data } = await axios.get(
          `https://graffers-task.onrender.com/api/companies?${params.toString()}`
        );
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    
    fetchCompanies();
  }, [city, sort]);
  
  const handleSearch = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
        <form onSubmit={handleSearch} className="w-full md:w-auto mb-4 md:mb-0">
          <div className="flex">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Select City"
                className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-4 rounded-r-md hover:bg-purple-700 transition duration-300"
            >
              Find Company
            </button>
          </div>
        </form>
        
        <Link
          to="/add-company"
          className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center"
        >
          <span className="mr-1">+</span> Add Company
        </Link>
        
        <div className="ml-4 flex items-center mt-4 md:mt-0">
          <span className="mr-2 text-sm text-gray-600">Sort:</span>
          <select
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : companies.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No companies found. Add a company to get started!</div>
        ) : (
          <div>
            <div className="text-sm text-gray-600 mb-4">
              Result found: {companies.length}
            </div>
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;