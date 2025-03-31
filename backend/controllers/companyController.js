const Company = require('../models/Company');

// @desc    Create a company
// @route   POST /api/companies
// @access  Private
const createCompany = async (req, res) => {
  try {
    const { name, logo, address, foundedOn, description } = req.body;

    const company = await Company.create({
      name,
      logo,
      address,
      foundedOn,
      description,
      addedBy: req.user._id
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const { city, sort, search } = req.query;
    
    let query = {};
    
    // Filter by city if provided
    if (city) {
      query['address.city'] = { $regex: city, $options: 'i' };
    }
    
    // Search by name if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    // Define sort options
    let sortOption = {};
    if (sort === 'name') {
      sortOption = { name: 1 };
    } else if (sort === 'rating') {
      sortOption = { averageRating: -1 };
    } else {
      sortOption = { createdAt: -1 }; // Default: newest first
    }

    const companies = await Company.find(query).sort(sortOption);
    
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCompany, getCompanies, getCompanyById };