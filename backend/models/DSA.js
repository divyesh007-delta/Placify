const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DSA = sequelize.define('DSA', {
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
      defaultValue: 'coding-test'
    },
    platform: {
      type: DataTypes.STRING // e.g., 'LeetCode', 'HackerRank', 'CodeSignal'
    },
    totalProblems: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
      }
    },
    solvedProblems: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    problems: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('problems');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('problems', JSON.stringify(value || []));
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
    programmingLanguage: {
      type: DataTypes.STRING,
      defaultValue: 'javascript'
    },
    result: {
      type: DataTypes.ENUM('passed', 'failed', 'pending'),
      defaultValue: 'pending'
    },
    score: {
      type: DataTypes.DECIMAL(5, 2) // percentage or raw score
    },
    timeComplexity: {
      type: DataTypes.TEXT
    },
    spaceComplexity: {
      type: DataTypes.TEXT
    },
    codeSubmitted: {
      type: DataTypes.TEXT
    },
    feedback: {
      type: DataTypes.TEXT
    },
    tips: {
      type: DataTypes.TEXT
    },
    interviewerName: {
      type: DataTypes.STRING
    }
  });

  // Associations
  DSA.associate = (models) => {
    DSA.belongsTo(models.Round, {
      foreignKey: 'roundId',
      as: 'round'
    });
  };

  return DSA;
};
