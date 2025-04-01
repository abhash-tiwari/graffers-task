import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AddCompanyPage from './pages/AddCompanyPage';
import AddReviewPage from './pages/AddReviewPage';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <Header user={user} logoutHandler={logoutHandler} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:id" element={<CompanyPage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/add-company" element={<AddCompanyPage user={user} />} />
          <Route path="/add-review/:companyId" element={<AddReviewPage user={user} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
