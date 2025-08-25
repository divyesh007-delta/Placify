const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PlacementExperience = sequelize.define('PlacementExperience', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    jobRole: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    // Admin approval status
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    // Placement process information
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    placementResult: {
      type: DataTypes.ENUM('selected', 'rejected', 'ongoing', 'offer_declined'),
      allowNull: false
    },
    // Salary information (optional, can be anonymous)
    salaryOffered: {
      type: DataTypes.DECIMAL(10, 2), // CTC in lakhs
    },
    // Round information summary
    totalRounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      }
    },
    roundsCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    // Which types of rounds were faced
    roundTypes: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('roundTypes');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('roundTypes', JSON.stringify(value || []));
      }
    },
    // Overall experience and tips
    overallExperience: {
      type: DataTypes.TEXT,
      validate: {
        len: [10, 2000]
      }
    },
    tips: {
      type: DataTypes.TEXT
    },
    // Difficulty and recommendation
    overallDifficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    wouldRecommend: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Privacy settings
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    showSalary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Admin notes and tracking
    adminNotes: {
      type: DataTypes.TEXT
    },
    reviewedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    reviewedAt: {
      type: DataTypes.DATE
    },
    // Engagement metrics
    helpfulVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // Status tracking
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Unique tracking ID for reference
    experienceId: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    hooks: {
      beforeCreate: (experience) => {
        // Generate unique experience ID
        experience.experienceId = 'EXP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      }
    }
  });

  // Associations
  PlacementExperience.associate = (models) => {
    PlacementExperience.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'student'
    });
    
    PlacementExperience.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
    
    PlacementExperience.belongsTo(models.User, {
      foreignKey: 'reviewedBy',
      as: 'reviewer'
    });
    
    // Placement experience can have multiple rounds
    PlacementExperience.hasMany(models.Round, {
      foreignKey: 'experienceId',
      as: 'rounds'
    });
  };

  return PlacementExperience;
};
