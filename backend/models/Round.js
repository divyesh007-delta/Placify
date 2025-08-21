const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Round = sequelize.define('Round', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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
    jobRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobId: {
      type: DataTypes.UUID,
      references: {
        model: 'Jobs',
        key: 'id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'SET NULL'
    },
    applicationDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('applied', 'shortlisted', 'rejected', 'selected', 'offer_received'),
      defaultValue: 'applied'
    },
    currentRound: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalRounds: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    package: {
      type: DataTypes.DECIMAL(10, 2) // CTC in lakhs
    },
    notes: {
      type: DataTypes.TEXT
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  // Associations
  Round.associate = (models) => {
    Round.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
    
    Round.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Round.belongsTo(models.Job, {
      foreignKey: 'jobId',
      as: 'job'
    });
    
    Round.hasMany(models.Aptitude, {
      foreignKey: 'roundId',
      as: 'aptitudeRounds'
    });
    
    Round.hasMany(models.Tech, {
      foreignKey: 'roundId',
      as: 'techRounds'
    });
    
    Round.hasMany(models.DSA, {
      foreignKey: 'roundId',
      as: 'dsaRounds'
    });
    
    Round.hasMany(models.HR, {
      foreignKey: 'roundId',
      as: 'hrRounds'
    });
  };

  return Round;
};
