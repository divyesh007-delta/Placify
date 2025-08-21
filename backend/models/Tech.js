const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tech = sequelize.define('Tech', {
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
        max: 480 // max 8 hours
      }
    },
    interviewType: {
      type: DataTypes.ENUM('video', 'in-person', 'phone', 'coding-test'),
      defaultValue: 'video'
    },
    interviewerName: {
      type: DataTypes.STRING
    },
    interviewerPosition: {
      type: DataTypes.STRING
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
    technicalSkills: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('technicalSkills');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('technicalSkills', JSON.stringify(value || []));
      }
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
    codeSubmitted: {
      type: DataTypes.TEXT
    },
    platform: {
      type: DataTypes.STRING // e.g., 'Google Meet', 'Zoom', 'HackerRank'
    }
  });

  // Associations
  Tech.associate = (models) => {
    Tech.belongsTo(models.Round, {
      foreignKey: 'roundId',
      as: 'round'
    });
  };

  return Tech;
};
