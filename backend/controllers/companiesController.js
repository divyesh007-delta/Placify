const { validationResult } = require('express-validator');
const { Company, Job, Review, Round } = require('../models');
const { Op } = require('sequelize');

// Get all companies
const getAllCompanies = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      industry,
      type,
      tier,
      sortBy = 'name',
      sortOrder = 'ASC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Add search filter
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Add filters
    if (industry) where.industry = industry;
    if (type) where.type = type;
    if (tier) where.tier = tier;
    where.isActive = true;

    const companies = await Company.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: Job,
          as: 'jobs',
          where: { isActive: true },
          required: false
        }
      ]
    });

    res.json({
      success: true,
      companies: companies.rows,
      pagination: {
        total: companies.count,
        page: parseInt(page),
        pages: Math.ceil(companies.count / limit),
        hasNext: offset + companies.rows.length < companies.count,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get company by ID
const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id, {
      include: [
        {
          model: Job,
          as: 'jobs',
          where: { isActive: true },
          required: false
        },
        {
          model: Review,
          as: 'reviews',
          where: { isActive: true },
          required: false,
          include: [{
            association: 'user',
            attributes: ['firstName', 'lastName', 'university']
          }]
        }
      ]
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.json({
      success: true,
      company
    });
  } catch (error) {
    next(error);
  }
};

// Create company (Admin only)
const createCompany = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    next(error);
  }
};

// Update company (Admin only)
const updateCompany = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    await company.update(req.body);

    res.json({
      success: true,
      message: 'Company updated successfully',
      company
    });
  } catch (error) {
    next(error);
  }
};

// Delete company (Admin only)
const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // Soft delete by setting isActive to false
    await company.update({ isActive: false });

    res.json({
      success: true,
      message: 'Company deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get company statistics
const getCompanyStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    const stats = {
      totalJobs: await Job.count({ where: { companyId: id, isActive: true } }),
      totalApplications: await Job.sum('totalApplications', { where: { companyId: id, isActive: true } }) || 0,
      totalReviews: await Review.count({ where: { companyId: id, isActive: true } }),
      averageRating: await Review.findOne({
        where: { companyId: id, isActive: true },
        attributes: [
          [require('sequelize').fn('AVG', require('sequelize').col('overallRating')), 'avgRating']
        ],
        raw: true
      }),
      totalRounds: await Round.count({ where: { companyId: id, isActive: true } })
    };

    res.json({
      success: true,
      stats: {
        ...stats,
        averageRating: parseFloat(stats.averageRating?.avgRating || 0).toFixed(1)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyStats
};
