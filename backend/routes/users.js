const express = require('express');
const { User } = require('../models');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', adminAuth, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      users: users.rows,
      pagination: {
        total: users.count,
        page: parseInt(page),
        pages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID (Admin only)
router.get('/:id', adminAuth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['applications', 'reviews']
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
