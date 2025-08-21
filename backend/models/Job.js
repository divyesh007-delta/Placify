const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Job = sequelize.define('Job', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    requirements: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('requirements');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('requirements', JSON.stringify(value || []));
      }
    },
    responsibilities: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('responsibilities');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('responsibilities', JSON.stringify(value || []));
      }
    },
    skillsRequired: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('skillsRequired');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('skillsRequired', JSON.stringify(value || []));
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jobType: {
      type: DataTypes.ENUM('full-time', 'part-time', 'internship', 'contract'),
      defaultValue: 'full-time'
    },
    workMode: {
      type: DataTypes.ENUM('onsite', 'remote', 'hybrid'),
      defaultValue: 'onsite'
    },
    experience: {
      type: DataTypes.STRING // e.g., '0-2 years', '2-5 years'
    },
    salaryMin: {
      type: DataTypes.DECIMAL(10, 2) // in lakhs
    },
    salaryMax: {
      type: DataTypes.DECIMAL(10, 2) // in lakhs
    },
    applicationDeadline: {
      type: DataTypes.DATE
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    totalApplications: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cgpaRequirement: {
      type: DataTypes.DECIMAL(3, 2),
      validate: {
        min: 0,
        max: 10
      }
    },
    eligibleBranches: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('eligibleBranches');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('eligibleBranches', JSON.stringify(value || []));
      }
    },
    eligibleGraduationYears: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('eligibleGraduationYears');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('eligibleGraduationYears', JSON.stringify(value || []));
      }
    }
  });

  // Associations
  Job.associate = (models) => {
    Job.belongsTo(models.Company, {
      foreignKey: 'companyId',
      as: 'company'
    });
    
    Job.hasMany(models.Application, {
      foreignKey: 'jobId',
      as: 'applications'
    });

    Job.hasMany(models.Round, {
      foreignKey: 'jobId',
      as: 'rounds'
    });
  };

  return Job;
};
