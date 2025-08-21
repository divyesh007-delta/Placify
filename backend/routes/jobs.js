const express = require('express');
const { Job, Company } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all jobs
router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      jobType,
      workMode,
      companyId
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { isActive: true };

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (location) where.location = { [Op.iLike]: `%${location}%` };
    if (jobType) where.jobType = jobType;
    if (workMode) where.workMode = workMode;
    if (companyId) where.companyId = companyId;

    const jobs = await Job.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [{
        model: Company,
        as: 'company',
        attributes: ['id', 'name', 'logo', 'industry']
      }]
    });

    res.json({
      success: true,
      jobs: jobs.rows,
      pagination: {
        total: jobs.count,
        page: parseInt(page),
        pages: Math.ceil(jobs.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get job by ID
router.get('/:id', async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{
        model: Company,
        as: 'company'
      }]
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      job
    });
  } catch (error) {
    next(error);
  }
});

// Create job (Admin only)
router.post('/', adminAuth, async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    next(error);
  }
});

// Update job (Admin only)
router.put('/:id', adminAuth, async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await job.update(req.body);
    res.json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    next(error);
  }
});

// Delete job (Admin only)
router.delete('/:id', adminAuth, async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await job.update({ isActive: false });
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
