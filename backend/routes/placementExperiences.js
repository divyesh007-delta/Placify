const express = require('express');
const { PlacementExperience, Company, User, Round, Aptitude, Tech, DSA, HR } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');
const { Op } = require('sequelize');

const router = express.Router();

// Get all approved placement experiences (public)
router.get('/', async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      companyId, 
      jobRole, 
      difficulty,
      placementResult,
      search
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { 
      status: 'approved', 
      isActive: true 
    };

    // Apply filters
    if (companyId) where.companyId = companyId;
    if (difficulty) where.overallDifficulty = difficulty;
    if (placementResult) where.placementResult = placementResult;
    
    if (jobRole) {
      where.jobRole = { [Op.iLike]: `%${jobRole}%` };
    }

    if (search) {
      where[Op.or] = [
        { jobRole: { [Op.iLike]: `%${search}%` } },
        { overallExperience: { [Op.iLike]: `%${search}%` } },
        { tips: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const experiences = await PlacementExperience.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo', 'industry']
        },
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'university'],
          // Hide student details if anonymous
          required: false
        },
        {
          model: Round,
          as: 'rounds',
          include: [
            { model: Aptitude, as: 'aptitudeRounds' },
            { model: Tech, as: 'techRounds' },
            { model: DSA, as: 'dsaRounds' },
            { model: HR, as: 'hrRounds' }
          ]
        }
      ]
    });

    // Filter out student info if anonymous
    const processedExperiences = experiences.rows.map(exp => {
      const expData = exp.toJSON();
      if (expData.isAnonymous) {
        expData.student = null;
      }
      if (!expData.showSalary) {
        expData.salaryOffered = null;
      }
      return expData;
    });

    res.json({
      success: true,
      experiences: processedExperiences,
      pagination: {
        total: experiences.count,
        page: parseInt(page),
        pages: Math.ceil(experiences.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user's own placement experiences
router.get('/my-experiences', auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    const where = { userId: req.user.id };

    if (status) where.status = status;

    const experiences = await PlacementExperience.findAndCountAll({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo', 'industry']
        },
        {
          model: Round,
          as: 'rounds',
          include: [
            { model: Aptitude, as: 'aptitudeRounds' },
            { model: Tech, as: 'techRounds' },
            { model: DSA, as: 'dsaRounds' },
            { model: HR, as: 'hrRounds' }
          ]
        }
      ]
    });

    res.json({
      success: true,
      experiences: experiences.rows,
      pagination: {
        total: experiences.count,
        page: parseInt(page),
        pages: Math.ceil(experiences.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Create new placement experience (submit for approval)
router.post('/', auth, async (req, res, next) => {
  try {
    const {
      companyId,
      jobRole,
      applicationDate,
      placementResult,
      salaryOffered,
      totalRounds,
      roundTypes,
      overallExperience,
      tips,
      overallDifficulty,
      wouldRecommend,
      isAnonymous,
      showSalary,
      rounds // Array of round details
    } = req.body;

    // Create the placement experience
    const experience = await PlacementExperience.create({
      userId: req.user.id,
      companyId,
      jobRole,
      applicationDate,
      placementResult,
      salaryOffered,
      totalRounds,
      roundTypes,
      overallExperience,
      tips,
      overallDifficulty,
      wouldRecommend: wouldRecommend !== undefined ? wouldRecommend : true,
      isAnonymous: isAnonymous || false,
      showSalary: showSalary || false,
      roundsCompleted: rounds ? rounds.length : 0
    });

    // Create associated rounds if provided
    if (rounds && Array.isArray(rounds)) {
      for (const roundData of rounds) {
        const round = await Round.create({
          ...roundData,
          experienceId: experience.id,
          userId: req.user.id,
          companyId: companyId
        });

        // Create specific round details based on type
        if (roundData.type === 'aptitude' && roundData.aptitudeDetails) {
          await Aptitude.create({
            roundId: round.id,
            ...roundData.aptitudeDetails
          });
        }
        
        if (roundData.type === 'technical' && roundData.techDetails) {
          await Tech.create({
            roundId: round.id,
            ...roundData.techDetails
          });
        }
        
        if (roundData.type === 'dsa' && roundData.dsaDetails) {
          await DSA.create({
            roundId: round.id,
            ...roundData.dsaDetails
          });
        }
        
        if (roundData.type === 'hr' && roundData.hrDetails) {
          await HR.create({
            roundId: round.id,
            ...roundData.hrDetails
          });
        }
      }
    }

    res.status(201).json({
      success: true,
      message: 'Placement experience submitted for approval',
      experience: {
        ...experience.toJSON(),
        status: 'pending'
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get placement experience by ID
router.get('/:id', async (req, res, next) => {
  try {
    const experience = await PlacementExperience.findByPk(req.params.id, {
      include: [
        {
          model: Company,
          as: 'company'
        },
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'university', 'branch', 'graduationYear']
        },
        {
          model: Round,
          as: 'rounds',
          include: [
            { model: Aptitude, as: 'aptitudeRounds' },
            { model: Tech, as: 'techRounds' },
            { model: DSA, as: 'dsaRounds' },
            { model: HR, as: 'hrRounds' }
          ]
        }
      ]
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Placement experience not found'
      });
    }

    // Check if experience is approved for public viewing
    if (experience.status !== 'approved' && !req.user) {
      return res.status(403).json({
        success: false,
        message: 'This experience is not yet approved'
      });
    }

    // Check if user owns this experience or is admin
    const isOwner = req.user && experience.userId === req.user.id;
    const isAdmin = req.user && req.user.role === 'admin';
    
    if (experience.status !== 'approved' && !isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Increment view count for approved experiences
    if (experience.status === 'approved' && (!req.user || !isOwner)) {
      await experience.increment('views');
    }

    const expData = experience.toJSON();
    
    // Hide student info if anonymous and not owner/admin
    if (expData.isAnonymous && !isOwner && !isAdmin) {
      expData.student = null;
    }
    
    // Hide salary if not allowed to show
    if (!expData.showSalary && !isOwner && !isAdmin) {
      expData.salaryOffered = null;
    }

    res.json({
      success: true,
      experience: expData
    });
  } catch (error) {
    next(error);
  }
});

// Get pending experiences for admin approval
router.get('/admin/pending', adminAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const experiences = await PlacementExperience.findAndCountAll({
      where: { status: 'pending' },
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'ASC']], // Oldest first for review
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo']
        },
        {
          model: User,
          as: 'student',
          attributes: ['id', 'firstName', 'lastName', 'email', 'university']
        }
      ]
    });

    res.json({
      success: true,
      experiences: experiences.rows,
      pagination: {
        total: experiences.count,
        page: parseInt(page),
        pages: Math.ceil(experiences.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Approve or reject placement experience (Admin only)
router.put('/:id/status', adminAuth, async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either approved or rejected'
      });
    }

    const experience = await PlacementExperience.findByPk(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Placement experience not found'
      });
    }

    await experience.update({
      status,
      adminNotes,
      reviewedBy: req.user.id,
      reviewedAt: new Date()
    });

    res.json({
      success: true,
      message: `Placement experience ${status} successfully`,
      experience
    });
  } catch (error) {
    next(error);
  }
});

// Update placement experience (owner only, only if pending)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const experience = await PlacementExperience.findByPk(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Placement experience not found'
      });
    }

    // Check if user owns this experience
    if (experience.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Only allow updates if still pending
    if (experience.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Can only edit experiences that are pending approval'
      });
    }

    await experience.update(req.body);

    res.json({
      success: true,
      message: 'Placement experience updated successfully',
      experience
    });
  } catch (error) {
    next(error);
  }
});

// Delete/deactivate placement experience
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const experience = await PlacementExperience.findByPk(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Placement experience not found'
      });
    }

    // Check if user owns this experience or is admin
    if (experience.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await experience.update({ isActive: false });

    res.json({
      success: true,
      message: 'Placement experience deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Vote helpful on an experience
router.post('/:id/vote-helpful', auth, async (req, res, next) => {
  try {
    const experience = await PlacementExperience.findByPk(req.params.id);

    if (!experience || experience.status !== 'approved') {
      return res.status(404).json({
        success: false,
        message: 'Placement experience not found or not approved'
      });
    }

    await experience.increment('helpfulVotes');

    res.json({
      success: true,
      message: 'Thank you for your feedback!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
