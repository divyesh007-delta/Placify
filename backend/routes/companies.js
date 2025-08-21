const express = require('express');
const { body } = require('express-validator');
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyStats
} = require('../controllers/companiesController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const createCompanyValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('industry')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be between 2 and 50 characters')
];

const updateCompanyValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('industry')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be between 2 and 50 characters')
];

// Routes
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.get('/:id/stats', getCompanyStats);
router.post('/', adminAuth, createCompanyValidation, createCompany);
router.put('/:id', adminAuth, updateCompanyValidation, updateCompany);
router.delete('/:id', adminAuth, deleteCompany);

module.exports = router;
