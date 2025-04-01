import { Link } from 'react-router-dom';

const Header = ({ user, logoutHandler }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-xl">★</span>
          </div>
          <h1 className="ml-2 text-2xl font-semibold text-gray-800">Review<span className="text-purple-600">&RATE</span></h1>
        </Link>

        <div className="flex items-center">
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
    </header>
  );
};

export default Header;