const { sequelize } = require('../config/database');
const db = require('../models');

const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models (create tables)
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database models synchronized successfully.');
    
    // Create default admin user if it doesn't exist
    const adminExists = await db.User.findOne({ where: { email: 'admin@placify.com' } });
    
    if (!adminExists) {
      await db.User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@placify.com',
        password: 'Admin123!',
        role: 'admin',
        isEmailVerified: true,
        university: 'Placify System',
        degree: 'System Administrator',
        branch: 'Technology'
      });
      console.log('✅ Default admin user created: admin@placify.com / Admin123!');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }
    
    // Create sample companies
    const sampleCompanies = [
      {
        name: 'Google',
        description: 'Multinational technology company that specializes in Internet-related services and products.',
        industry: 'Technology',
        website: 'https://google.com',
        headquarters: 'Mountain View, California',
        employeeCount: '1000+',
        type: 'mnc',
        tier: 'tier1',
        tags: ['AI/ML', 'Cloud Computing', 'Search Engine', 'Mobile Apps'],
        averageRating: 4.5,
        totalReviews: 0
      },
      {
        name: 'Microsoft',
        description: 'American multinational technology corporation which produces computer software, consumer electronics.',
        industry: 'Technology',
        website: 'https://microsoft.com',
        headquarters: 'Redmond, Washington',
        employeeCount: '1000+',
        type: 'mnc',
        tier: 'tier1',
        tags: ['Cloud Computing', 'Operating Systems', 'Office Suite', 'Gaming'],
        averageRating: 4.3,
        totalReviews: 0
      },
      {
        name: 'Amazon',
        description: 'American multinational technology company focusing on e-commerce, cloud computing, digital streaming.',
        industry: 'Technology',
        website: 'https://amazon.com',
        headquarters: 'Seattle, Washington',
        employeeCount: '1000+',
        type: 'mnc',
        tier: 'tier1',
        tags: ['E-commerce', 'Cloud Computing', 'AI/ML', 'Logistics'],
        averageRating: 4.2,
        totalReviews: 0
      }
    ];
    
    for (const companyData of sampleCompanies) {
      const existingCompany = await db.Company.findOne({ where: { name: companyData.name } });
      if (!existingCompany) {
        await db.Company.create(companyData);
        console.log(`✅ Sample company created: ${companyData.name}`);
      }
    }
    
    console.log('🎉 Database initialization completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure PostgreSQL is running');
    console.log('2. Update the database credentials in .env file');
    console.log('3. Run: npm run dev to start the server');
    console.log('\n🔐 Admin credentials:');
    console.log('Email: admin@placify.com');
    console.log('Password: Admin123!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

// Run initialization if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
