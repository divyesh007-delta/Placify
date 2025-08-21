const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
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
      allowNull: false
    },
    interviewDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    overallRating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    interviewDifficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    interviewExperience: {
      type: DataTypes.ENUM('positive', 'neutral', 'negative'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [50, 2000]
      }
    },
    pros: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('pros');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('pros', JSON.stringify(value || []));
      }
    },
    cons: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('cons');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('cons', JSON.stringify(value || []));
      }
    },
    interviewRounds: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 10
      }
    },
    technicalQuestions: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('technicalQuestions');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('technicalQuestions', JSON.stringify(value || []));
      }
    },
    hrQuestions: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('hrQuestions');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('hrQuestions', JSON.stringify(value || []));
      }
    },
    tips: {
      type: DataTypes.TEXT
    },
    result: {
      type: DataTypes.ENUM('selected', 'rejected', 'pending', 'offer_declined'),
      defaultValue: 'pending'
    },
    salaryOffered: {
      type: DataTypes.DECIMAL(10, 2) // in lakhs
    },
    wouldRecommend: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    helpfulVotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    reportCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  // Associations
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    
    Review.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return Review;
};
