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
    experienceId: {
      type: DataTypes.UUID,
      references: {
        model: 'PlacementExperiences',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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

    Round.belongsTo(models.PlacementExperience, {
      foreignKey: 'experienceId',
      as: 'experience'
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
