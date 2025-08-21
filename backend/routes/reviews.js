const express = require('express');
const { Review, Company, User } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Validation rules
const createReviewValidation = [
  body('companyId').isUUID().withMessage('Valid company ID is required'),
  body('jobRole').trim().isLength({ min: 2, max: 100 }).withMessage('Job role must be between 2 and 100 characters'),
  body('interviewDate').isISO8601().withMessage('Valid interview date is required'),
  body('overallRating').isFloat({ min: 1, max: 5 }).withMessage('Overall rating must be between 1 and 5'),
  body('title').trim().isLength({ min: 10, max: 100 }).withMessage('Title must be between 10 and 100 characters'),
  body('description').trim().isLength({ min: 50, max: 2000 }).withMessage('Description must be between 50 and 2000 characters')
];

// Get reviews for a company
router.get('/company/:companyId', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
    const offset = (page - 1) * limit;

    const reviews = await Review.findAndCountAll({
      where: { 
        companyId: req.params.companyId,
        isActive: true 
      },
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder]],
      include: [{
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'university']
      }]
    });

    res.json({
      success: true,
      reviews: reviews.rows,
      pagination: {
        total: reviews.count,
        page: parseInt(page),
        pages: Math.ceil(reviews.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user's reviews
router.get('/my-reviews', auth, async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Company,
        as: 'company',
        attributes: ['id', 'name', 'logo']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    next(error);
  }
});

// Create review
router.post('/', auth, createReviewValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { companyId } = req.body;

    // Check if company exists
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Check if user already reviewed this company
    const existingReview = await Review.findOne({
      where: { userId: req.user.id, companyId }
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this company'
      });
    }

    const review = await Review.create({
      ...req.body,
      userId: req.user.id
    });

    // Update company stats
    const avgRating = await Review.findOne({
      where: { companyId, isActive: true },
      attributes: [
        [require('sequelize').fn('AVG', require('sequelize').col('overallRating')), 'avgRating'],
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'totalReviews']
      ],
      raw: true
    });

    await company.update({
      averageRating: parseFloat(avgRating.avgRating || 0).toFixed(1),
      totalReviews: parseInt(avgRating.totalReviews || 0)
    });

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review
    });
  } catch (error) {
    next(error);
  }
});

// Get review by ID
router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo']
        },
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'university']
        }
      ]
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      review
    });
  } catch (error) {
    next(error);
  }
});

// Update review
router.put('/:id', auth, createReviewValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review
    if (review.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await review.update(req.body);

    res.json({
      success: true,
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    next(error);
  }
});

// Delete review
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user owns this review or is admin
    if (review.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await review.update({ isActive: false });

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
