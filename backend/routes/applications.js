const express = require('express');
const { Application, Job, Company, User } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get user's applications
router.get('/my-applications', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    const where = { userId: req.user.id };

    if (status) where.status = status;

    const applications = await Application.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Job,
          as: 'job',
          include: [{
            model: Company,
            as: 'company',
            attributes: ['id', 'name', 'logo']
          }]
        },
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo']
        }
      ]
    });

    res.json({
      success: true,
      applications: applications.rows,
      pagination: {
        total: applications.count,
        page: parseInt(page),
        pages: Math.ceil(applications.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Apply for a job
router.post('/', auth, async (req, res, next) => {
  try {
    const { jobId, coverLetter, expectedSalary } = req.body;

    // Check if job exists
    const job = await Job.findByPk(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or no longer active'
      });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      where: { userId: req.user.id, jobId }
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    const application = await Application.create({
      userId: req.user.id,
      jobId,
      companyId: job.companyId,
      coverLetter,
      expectedSalary,
      resumeVersion: req.user.resume
    });

    // Increment job application count
    await job.increment('totalApplications');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    next(error);
  }
});

// Get application by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id, {
      include: [
        { model: Job, as: 'job' },
        { model: Company, as: 'company' },
        { model: User, as: 'user', attributes: ['firstName', 'lastName', 'email'] }
      ]
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Check if user owns this application or is admin
    if (application.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    next(error);
  }
});

// Update application status (Admin only)
router.put('/:id/status', adminAuth, async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    await application.update({ status });

    res.json({
      success: true,
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
