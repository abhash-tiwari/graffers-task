import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Header = ({ user, logoutHandler }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white text-xl">★</span>
            </div>
            <h1 className="ml-2 text-2xl font-semibold text-purple-600">Review<span className="text-gray-800 text-2xl font-bold">&RATE</span></h1>
          </Link>

          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <div className="ml-4">
              {user ? (
                <div className="flex items-center">
                  <span className="mr-3">{user.fullName}</span>
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link
                    to="/signup"
                    className="bg-purple-100 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-200 transition duration-300 mr-2"
                  >
                    SignUp
                  </Link>
                  <Link
                    to="/login"
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={menuRef}
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-4">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {user ? (
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700">{user.fullName}</span>
                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/signup"
                  className="bg-purple-100 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-200 transition duration-300 text-center"
                >
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 text-center"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;