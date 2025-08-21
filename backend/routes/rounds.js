const express = require('express');
const { Round, Aptitude, Tech, DSA, HR, Company, User } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get user's rounds
router.get('/my-rounds', auth, async (req, res, next) => {
  try {
    const rounds = await Round.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Company,
          as: 'company',
          attributes: ['id', 'name', 'logo']
        },
        { model: Aptitude, as: 'aptitudeRounds' },
        { model: Tech, as: 'techRounds' },
        { model: DSA, as: 'dsaRounds' },
        { model: HR, as: 'hrRounds' }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      rounds
    });
  } catch (error) {
    next(error);
  }
});

// Create round
router.post('/', auth, async (req, res, next) => {
  try {
    const round = await Round.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Round created successfully',
      round
    });
  } catch (error) {
    next(error);
  }
});

// Get round by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        { model: User, as: 'user', attributes: ['firstName', 'lastName'] },
        { model: Aptitude, as: 'aptitudeRounds' },
        { model: Tech, as: 'techRounds' },
        { model: DSA, as: 'dsaRounds' },
        { model: HR, as: 'hrRounds' }
      ]
    });

    if (!round) {
      return res.status(404).json({
        success: false,
        message: 'Round not found'
      });
    }

    // Check if user owns this round or is admin
    if (round.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      round
    });
  } catch (error) {
    next(error);
  }
});

// Update round
router.put('/:id', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.id);

    if (!round) {
      return res.status(404).json({
        success: false,
        message: 'Round not found'
      });
    }

    // Check if user owns this round
    if (round.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await round.update(req.body);

    res.json({
      success: true,
      message: 'Round updated successfully',
      round
    });
  } catch (error) {
    next(error);
  }
});

// Add aptitude round
router.post('/:roundId/aptitude', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.roundId);
    
    if (!round || round.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Round not found or access denied'
      });
    }

    const aptitude = await Aptitude.create({
      ...req.body,
      roundId: req.params.roundId
    });

    res.status(201).json({
      success: true,
      message: 'Aptitude round added successfully',
      aptitude
    });
  } catch (error) {
    next(error);
  }
});

// Add technical round
router.post('/:roundId/tech', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.roundId);
    
    if (!round || round.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Round not found or access denied'
      });
    }

    const tech = await Tech.create({
      ...req.body,
      roundId: req.params.roundId
    });

    res.status(201).json({
      success: true,
      message: 'Technical round added successfully',
      tech
    });
  } catch (error) {
    next(error);
  }
});

// Add DSA round
router.post('/:roundId/dsa', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.roundId);
    
    if (!round || round.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Round not found or access denied'
      });
    }

    const dsa = await DSA.create({
      ...req.body,
      roundId: req.params.roundId
    });

    res.status(201).json({
      success: true,
      message: 'DSA round added successfully',
      dsa
    });
  } catch (error) {
    next(error);
  }
});

// Add HR round
router.post('/:roundId/hr', auth, async (req, res, next) => {
  try {
    const round = await Round.findByPk(req.params.roundId);
    
    if (!round || round.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: 'Round not found or access denied'
      });
    }

    const hr = await HR.create({
      ...req.body,
      roundId: req.params.roundId
    });

    res.status(201).json({
      success: true,
      message: 'HR round added successfully',
      hr
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
