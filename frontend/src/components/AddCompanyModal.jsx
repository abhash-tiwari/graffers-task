import { useState } from 'react';
import axios from 'axios';

const AddCompanyModal = ({ isOpen, onClose, user, onSuccess }) => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [foundedOn, setFoundedOn] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!name || !street || !city || !state || !country) {
      setError('Please fill in all required fields');
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
        'https://graffers-task.onrender.com/api/companies',
        {
          name,
          logo,
          address: {
            street,
            area,
            city,
            state,
            country,
            pincode,
          },
          foundedOn,
          description,
        },
        config
      );
      
      onSuccess();
      onClose();
    } catch (error) {
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'An error occurred while adding the company'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-16 h-16 bg-purple-600 rounded-full opacity-90"></div>
        <div className="absolute top-0 left-8 w-12 h-12 bg-purple-300 rounded-full opacity-70"></div>
        
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 mt-4">Add Company</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="name">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter..."
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="logo">
                  Logo URL
                </label>
                <input
                  type="text"
                  id="logo"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="Enter logo URL"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block" htmlFor="street">
                Select Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="street"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Select Location"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500 mb-1 block" htmlFor="area">
                Area
              </label>
              <input
                type="text"
                id="area"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="city">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="state">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Enter state"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter country"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 mb-1 block" htmlFor="pincode">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter pincode"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block" htmlFor="foundedOn">
                Founded on
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="foundedOn"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={foundedOn}
                  onChange={(e) => setFoundedOn(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter company description"
              ></textarea>
            </div>
            
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 font-medium"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;