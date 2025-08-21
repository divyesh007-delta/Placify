const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Aptitude = sequelize.define('Aptitude', {
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
        max: 600 // max 10 hours
      }
    },
    totalQuestions: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    attemptedQuestions: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    correctAnswers: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
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
    platform: {
      type: DataTypes.STRING // e.g., 'HackerRank', 'Codility', 'Company Portal'
    },
    result: {
      type: DataTypes.ENUM('passed', 'failed', 'pending'),
      defaultValue: 'pending'
    },
    score: {
      type: DataTypes.DECIMAL(5, 2) // percentage or raw score
    },
    cutoffScore: {
      type: DataTypes.DECIMAL(5, 2)
    },
    feedback: {
      type: DataTypes.TEXT
    },
    tips: {
      type: DataTypes.TEXT
    },
    isNegativeMarking: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Associations
  Aptitude.associate = (models) => {
    Aptitude.belongsTo(models.Round, {
      foreignKey: 'roundId',
      as: 'round'
    });
  };

  return Aptitude;
};
