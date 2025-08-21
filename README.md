# Placify 🎯

**Placify** is a comprehensive placement management platform designed to streamline the job placement process for students, universities, and recruiters. Built with modern web technologies, it provides a complete ecosystem for managing job applications, company interactions, interview rounds, and placement analytics.

## ✨ Features

### For Students
- 👤 **Profile Management**: Complete student profiles with academic details, skills, and achievements
- 🔍 **Job Discovery**: Browse and filter job opportunities from various companies
- 📝 **Application Tracking**: Track application status across multiple companies
- 📊 **Interview Rounds**: Manage different interview rounds (Aptitude, Technical, HR)
- ⭐ **Company Reviews**: Read and write reviews about placement experiences
- 📈 **Analytics Dashboard**: Track application success rates and placement statistics

### For Companies
- 🏢 **Company Profiles**: Detailed company information and job postings
- 👥 **Candidate Management**: View and filter student applications
- 📋 **Job Posting**: Create and manage job listings with detailed requirements
- 🎯 **Recruitment Pipeline**: Organize candidates through different interview stages
- 📊 **Hiring Analytics**: Track recruitment metrics and success rates

### For Administrators
- 🔧 **System Management**: Complete platform administration
- 📊 **Placement Analytics**: University-wide placement statistics
- 👥 **User Management**: Manage student and company accounts
- 🎓 **Academic Integration**: Link with university academic systems

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI for accessible components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Theme**: Next Themes for dark/light mode

### Backend
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with bcryptjs
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Express Validator
- **Logging**: Morgan

### Development Tools
- **Package Manager**: npm
- **Database**: PostgreSQL
- **Environment**: dotenv for configuration
- **Development**: Nodemon for hot reload

## 📋 Prerequisites

Before setting up Placify, ensure you have:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **PostgreSQL** (v13 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/placify.git
cd placify
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run backend:install
```

### 3. Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create a database**:
   ```sql
   CREATE DATABASE placify_db;
   CREATE USER postgres WITH ENCRYPTED PASSWORD '1414';
   GRANT ALL PRIVILEGES ON DATABASE placify_db TO postgres;
   ```

3. **Configure environment variables**:
   - Backend: Update `backend/.env` with your database credentials
   - Frontend: Update `.env.local` if needed

### 4. Initialize Database
```bash
npm run backend:init
```

This will create all necessary tables and seed the database with:
- Default admin user: `admin@placify.com` / `Admin123!`
- Sample companies (Google, Microsoft, Amazon)

### 5. Start Development Servers

**Option 1: Run both servers separately** (Recommended)
```bash
# Terminal 1 - Backend (runs on http://localhost:5000)
npm run dev:backend

# Terminal 2 - Frontend (runs on http://localhost:3000)
npm run dev:frontend
```

**Option 2: Run frontend only** (if backend is already running)
```bash
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 📁 Project Structure

```
placify/
├── 📁 backend/                 # Express.js API server
│   ├── 📁 config/             # Database and app configuration
│   ├── 📁 controllers/        # API route controllers
│   ├── 📁 middleware/         # Authentication & error handling
│   ├── 📁 models/             # Sequelize database models
│   ├── 📁 routes/             # API route definitions
│   ├── 📁 scripts/            # Database initialization scripts
│   ├── 📄 server.js           # Express server entry point
│   ├── 📄 package.json        # Backend dependencies
│   └── 📄 .env                # Backend environment variables
├── 📁 lib/                    # Frontend utilities and API client
├── 📁 components/             # Reusable React components
├── 📁 app/                    # Next.js app router pages
├── 📁 public/                 # Static assets
├── 📄 package.json           # Frontend dependencies & scripts
├── 📄 .env.local             # Frontend environment variables
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 next.config.js         # Next.js configuration
└── 📄 README.md              # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create job posting
- `PUT /api/jobs/:id` - Update job posting

### Applications
- `GET /api/applications` - Get applications
- `POST /api/applications` - Submit application
- `PUT /api/applications/:id` - Update application status

### Reviews & Rounds
- `GET /api/reviews` - Get company reviews
- `POST /api/reviews` - Create review
- `GET /api/rounds` - Get interview rounds
- `POST /api/rounds` - Create interview round

## 🔐 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=placify_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Placify
NEXT_PUBLIC_APP_VERSION=1.0.0
NODE_ENV=development
```

## 🧪 Testing

```bash
# Run frontend linting
npm run lint

# Test backend API endpoints
node backend/test-api.js
```

## 📦 Building for Production

```bash
# Build frontend
npm run build

# Start production frontend
npm start

# Start production backend
cd backend && npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Divyesh Patel** - *Initial work* - [divyesh007-delta](https://github.com/divyesh007-delta)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Express.js](https://expressjs.com/)
- UI components from [Radix UI](https://radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Database powered by [PostgreSQL](https://postgresql.org/)

## 🐛 Issues & Support

If you encounter any issues or need support, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the development team

---

**Made with ❤️ for seamless placement management**
