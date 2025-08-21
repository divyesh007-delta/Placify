# Placify Backend API

A complete MERN stack placement management system backend built with Node.js, Express.js, PostgreSQL, and Sequelize ORM.

## Features

- 🔐 **Authentication & Authorization**: JWT-based auth with bcrypt password hashing
- 👥 **User Management**: Student and admin roles with comprehensive profiles
- 🏢 **Company Management**: Complete company profiles with ratings and reviews
- 💼 **Job Management**: Job postings with application tracking
- 📝 **Application System**: Apply for jobs and track application status
- 🎯 **Interview Rounds**: Detailed tracking of Aptitude, Technical, DSA, and HR rounds
- ⭐ **Review System**: Company reviews and ratings by students
- 🛡️ **Security**: Helmet, CORS, rate limiting, input validation
- 📊 **Analytics**: Company statistics and placement insights

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: helmet, CORS, express-rate-limit
- **Logging**: morgan
- **Development**: nodemon

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── companiesController.js
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── errorHandler.js      # Global error handling
├── models/
│   ├── index.js             # Model associations
│   ├── User.js              # User model
│   ├── Company.js           # Company model
│   ├── Job.js               # Job model
│   ├── Application.js       # Application model
│   ├── Review.js            # Review model
│   ├── Round.js             # Interview round model
│   ├── Aptitude.js          # Aptitude test model
│   ├── Tech.js              # Technical interview model
│   ├── DSA.js               # DSA interview model
│   └── HR.js                # HR interview model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   ├── companies.js         # Company management routes
│   ├── jobs.js              # Job management routes
│   ├── applications.js      # Application management routes
│   ├── reviews.js           # Review management routes
│   └── rounds.js            # Interview round routes
├── scripts/
│   └── initDb.js            # Database initialization
├── .env                     # Environment variables
├── server.js                # Main server file
└── package.json
```

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL**
   - Install PostgreSQL if not already installed
   - Create a database named `placify_db`
   - Update database credentials in `.env` file

4. **Configure environment variables**
   ```bash
   # Update the .env file with your database credentials
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=placify_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. **Initialize database**
   ```bash
   npm run init-db
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `GET /api/companies/:id/stats` - Get company statistics
- `POST /api/companies` - Create company (Admin)
- `PUT /api/companies/:id` - Update company (Admin)
- `DELETE /api/companies/:id` - Delete company (Admin)

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job (Admin)
- `PUT /api/jobs/:id` - Update job (Admin)
- `DELETE /api/jobs/:id` - Delete job (Admin)

### Applications
- `GET /api/applications/my-applications` - Get user's applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/:id` - Get application details
- `PUT /api/applications/:id/status` - Update application status (Admin)

### Reviews
- `GET /api/reviews/company/:companyId` - Get company reviews
- `GET /api/reviews/my-reviews` - Get user's reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/:id` - Get review by ID
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Interview Rounds
- `GET /api/rounds/my-rounds` - Get user's rounds
- `POST /api/rounds` - Create new round
- `GET /api/rounds/:id` - Get round details
- `PUT /api/rounds/:id` - Update round
- `POST /api/rounds/:roundId/aptitude` - Add aptitude round
- `POST /api/rounds/:roundId/tech` - Add technical round
- `POST /api/rounds/:roundId/dsa` - Add DSA round
- `POST /api/rounds/:roundId/hr` - Add HR round

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## Database Models

### User Model
- Profile information (name, email, university, CGPA, etc.)
- Authentication (password hashing with bcrypt)
- Role-based access (student/admin)

### Company Model
- Company details (name, industry, website, etc.)
- Rating and review aggregations
- Company classifications (tier, type)

### Job Model
- Job posting details
- Requirements and responsibilities
- Salary ranges and application deadlines

### Application Model
- Job application tracking
- Status updates and timeline
- Resume and cover letter management

### Review Model
- Company reviews by students
- Rating system (1-5 stars)
- Interview experience sharing

### Round Models
- **Round**: Base interview round information
- **Aptitude**: Aptitude test details and results
- **Tech**: Technical interview specifics
- **DSA**: Data structures and algorithms round
- **HR**: HR interview and cultural fit assessment

## Default Credentials

After running `npm run init-db`, use these credentials to access admin features:

- **Email**: admin@placify.com
- **Password**: Admin123!

## Security Features

- JWT-based authentication
- Password hashing with bcrypt (salt rounds: 12)
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Security headers with Helmet
- SQL injection prevention with Sequelize ORM

## Error Handling

- Global error handler middleware
- Comprehensive error responses
- Development vs production error details
- Sequelize error handling
- JWT token validation errors

## Validation

- Express-validator for input validation
- Email format validation
- Password strength requirements
- UUID validation for IDs
- Custom business logic validation

## Development

1. **Environment**: Set NODE_ENV=development in .env
2. **Database**: Uses PostgreSQL with connection pooling
3. **Logging**: Morgan for HTTP request logging
4. **Hot Reload**: Nodemon for development

## Production Deployment

1. Set NODE_ENV=production
2. Use environment variables for all sensitive data
3. Configure database with connection pooling
4. Set up proper logging and monitoring
5. Configure reverse proxy (nginx)
6. Use PM2 for process management

## API Documentation

The API follows RESTful conventions with consistent response formats:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
