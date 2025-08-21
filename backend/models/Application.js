const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Application = sequelize.define('Application', {
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
    jobId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Jobs',
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
    status: {
      type: DataTypes.ENUM('applied', 'under_review', 'shortlisted', 'interview_scheduled', 'rejected', 'selected', 'offer_received', 'offer_accepted', 'offer_declined'),
      defaultValue: 'applied'
    },
    applicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    resumeVersion: {
      type: DataTypes.STRING // URL or version identifier
    },
    coverLetter: {
      type: DataTypes.TEXT
    },
    expectedSalary: {
      type: DataTypes.DECIMAL(10, 2) // in lakhs
    },
    availabilityDate: {
      type: DataTypes.DATE
    },
    notes: {
      type: DataTypes.TEXT
    },
    trackingId: {
      type: DataTypes.STRING,
      unique: true
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    hooks: {
      beforeCreate: (application) => {
        // Generate unique tracking ID
        application.trackingId = 'APP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      },
      beforeUpdate: (application) => {
        application.lastUpdated = new Date();
      }
    }
  });

  // Associations
  Application.associate = (models) => {
    Application.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    
    Application.belongsTo(models.Job, {
      foreignKey: 'jobId',
      as: 'job'
    });
    
    Application.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
  };

  return Application;
};
