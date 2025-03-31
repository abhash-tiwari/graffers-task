const express = require('express');
const { createCompany, getCompanies, getCompanyById } = require('../controllers/companyController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .post(protect, createCompany)
  .get(getCompanies);

router.get('/:id', getCompanyById);

module.exports = router;