const { sequelize } = require('../config/database');

// Import all models
const User = require('./User');
const Company = require('./Company');
const Job = require('./Job');
const Round = require('./Round');
const Aptitude = require('./Aptitude');
const Tech = require('./Tech');
const DSA = require('./DSA');
const HR = require('./HR');
const Review = require('./Review');
const Application = require('./Application');

// Initialize models
const models = {
  User: User(sequelize),
  Company: Company(sequelize),
  Job: Job(sequelize),
  Round: Round(sequelize),
  Aptitude: Aptitude(sequelize),
  Tech: Tech(sequelize),
  DSA: DSA(sequelize),
  HR: HR(sequelize),
  Review: Review(sequelize),
  Application: Application(sequelize)
};

// Set up associations
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = {
  ...models,
  sequelize
};
