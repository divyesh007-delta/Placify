const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const HR = sequelize.define('HR', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roundId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Rounds',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    roundNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER, // in minutes
      validate: {
        min: 1,
        max: 240 // max 4 hours
      }
    },
    interviewType: {
      type: DataTypes.ENUM('video', 'in-person', 'phone'),
      defaultValue: 'video'
    },
    interviewerName: {
      type: DataTypes.STRING
    },
    interviewerPosition: {
      type: DataTypes.STRING
    },
    questionsAsked: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('questionsAsked');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('questionsAsked', JSON.stringify(value || []));
      }
    },
    topics: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('topics');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('topics', JSON.stringify(value || []));
      }
    },
    difficulty: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      defaultValue: 'medium'
    },
    result: {
      type: DataTypes.ENUM('passed', 'failed', 'pending'),
      defaultValue: 'pending'
    },
    performance: {
      type: DataTypes.ENUM('excellent', 'good', 'average', 'poor'),
      defaultValue: 'average'
    },
    feedback: {
      type: DataTypes.TEXT
    },
    tips: {
      type: DataTypes.TEXT
    },
    companyValues: {
      type: DataTypes.TEXT
    },
    culturalFit: {
      type: DataTypes.ENUM('excellent', 'good', 'average', 'poor'),
      defaultValue: 'average'
    },
    communication: {
      type: DataTypes.ENUM('excellent', 'good', 'average', 'poor'),
      defaultValue: 'average'
    },
    salaryDiscussed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    salaryExpectation: {
      type: DataTypes.DECIMAL(10, 2) // in lakhs
    },
    negotiationStatus: {
      type: DataTypes.ENUM('accepted', 'negotiated', 'rejected', 'pending'),
      defaultValue: 'pending'
    },
    platform: {
      type: DataTypes.STRING // e.g., 'Google Meet', 'Zoom', 'Microsoft Teams'
    }
  });

  // Associations
  HR.associate = (models) => {
    HR.belongsTo(models.Round, {
      foreignKey: 'roundId',
      as: 'round'
    });
  };

  return HR;
};
