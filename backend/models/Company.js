const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    industry: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 50]
      }
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    headquarters: {
      type: DataTypes.STRING
    },
    employeeCount: {
      type: DataTypes.ENUM('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'),
    },
    logo: {
      type: DataTypes.STRING, // URL or file path
    },
    type: {
      type: DataTypes.ENUM('startup', 'mnc', 'government', 'ngo'),
      defaultValue: 'startup'
    },
    tier: {
      type: DataTypes.ENUM('tier1', 'tier2', 'tier3'),
      defaultValue: 'tier2'
    },
    tags: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('tags');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('tags', JSON.stringify(value || []));
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    averageRating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    totalReviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  // Associations
  Company.associate = (models) => {
    Company.hasMany(models.Job, {
      foreignKey: 'companyId',
      as: 'jobs'
    });
    
    Company.hasMany(models.Review, {
      foreignKey: 'companyId',
      as: 'reviews'
    });

    Company.hasMany(models.Round, {
      foreignKey: 'companyId',
      as: 'rounds'
    });
  };

  return Company;
};
