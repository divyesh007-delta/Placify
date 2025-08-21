const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^[+]?[\d\s-()]+$/
      }
    },
    university: {
      type: DataTypes.STRING
    },
    degree: {
      type: DataTypes.STRING
    },
    branch: {
      type: DataTypes.STRING
    },
    graduationYear: {
      type: DataTypes.INTEGER,
      validate: {
        min: 2020,
        max: 2030
      }
    },
    currentCGPA: {
      type: DataTypes.DECIMAL(3, 2),
      validate: {
        min: 0,
        max: 10
      }
    },
    tenthPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      validate: {
        min: 0,
        max: 100
      }
    },
    twelfthPercentage: {
      type: DataTypes.DECIMAL(5, 2),
      validate: {
        min: 0,
        max: 100
      }
    },
    skills: {
      type: DataTypes.TEXT,
      get() {
        const value = this.getDataValue('skills');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue('skills', JSON.stringify(value || []));
      }
    },
    resume: {
      type: DataTypes.STRING, // URL or file path
    },
    profilePicture: {
      type: DataTypes.STRING, // URL or file path
    },
    role: {
      type: DataTypes.ENUM('student', 'admin'),
      defaultValue: 'student'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLogin: {
      type: DataTypes.DATE
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  // Instance methods
  User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  // Associations
  User.associate = (models) => {
    User.hasMany(models.Application, {
      foreignKey: 'userId',
      as: 'applications'
    });
    
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
  };

  return User;
};
