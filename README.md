# Company Review & Rating Platform

A full-stack web application that allows users to add, review, and rate companies. Built with React.js for the frontend and Node.js/Express for the backend.

## Features

- User Authentication (Signup/Login)
- Company Management
  - Add new companies with details
  - View company listings
  - Company search by city
  - Sort companies by name, rating, or newest
- Review System
  - Add reviews for companies
  - Rate companies
  - View company reviews
- Responsive Design
  - Mobile-friendly interface
  - Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddCompanyModal.jsx
│   │   │   ├── CompanyCard.jsx
│   │   │   ├── Header.jsx
│   │   │   └── ReviewForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CompanyPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
│
└── backend/
    ├── models/
    │   ├── Company.js
    │   ├── Review.js
    │   └── User.js
    ├── routes/
    │   ├── auth.js
    │   ├── companies.js
    │   └── reviews.js
    ├── middleware/
    │   └── auth.js
    ├── config/
    │   └── db.js
    ├── uploads/
    └── server.js
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Companies
- `GET /api/companies` - Get all companies (with filters)
  - Query params: city, sort (name/rating/newest)
- `POST /api/companies` - Add a new company
- `GET /api/companies/:id` - Get company details
- `PUT /api/companies/:id` - Update company details
- `DELETE /api/companies/:id` - Delete a company

### Reviews
- `GET /api/reviews/company/:companyId` - Get reviews for a company
- `POST /api/reviews` - Add a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## Frontend Routes

- `/` - Homepage (Company listing)
- `/company/:id` - Company details page
- `/login` - Login page
- `/signup` - Signup page

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the backend server
```bash
cd backend
npm start
```

6. Start the frontend development server
```bash
cd frontend
npm run dev
```

## Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Backend server port (default: 5000)

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 