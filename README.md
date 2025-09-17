# 🗺️ Routetripper - AI-Powered Travel Platform

Production-ready full-stack application with AI integration, real-time mapping, and enterprise-grade architecture. Built with Next.js 14, TypeScript, Keystone CMS, and modern development practices.

![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Architecture](https://img.shields.io/badge/Architecture-Monorepo-orange)

## 🚀 Live Demo

**[Routetripper.com](https://routetripper.com)** - Custom domain via Cloudflare

## ✨ Key Features

- **AI Chat Assistant**: OpenAI GPT-4 integration with rate limiting and usage tracking
- **Interactive Maps**: Google Maps API with custom styling and route optimization
- **User Management**: Clerk authentication with webhook synchronization
- **Data Management**: Keystone CMS for content and database management
- **Real-time Analytics**: Usage tracking with progress indicators and limits
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI components

## 🏗️ Technical Architecture

**Frontend**: Next.js 14 with App Router, TypeScript, Apollo Client, Tailwind CSS
**Backend**: Keystone 6 CMS with PostgreSQL, Prisma ORM, GraphQL
**AI Integration**: OpenAI GPT-4 with rate limiting and usage tracking
**Maps**: Google Maps API with custom styling and route optimization
**Auth**: Clerk with webhook synchronization and JWT validation
**Storage**: Cloudinary for image optimization and CDN delivery

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google Maps API key
- Clerk authentication keys
- Cloudinary account
- Railway account

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/yourusername/trip-planner.git
   cd trip-planner
   nvm use
   npm install
   npm run dev  # Starts both frontend (4000) and backend (3000)
   ```

2. **Environment setup**

   ```bash
   cp apps/web/.env.example
   cp apps/keystone/.env.example apps/keystone/.env
   ```

3. **Configure environment variables**

# Frontend (.env)

```bash
GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
OPENAI_API_KEY=
```

# Backend (.env)

```bash
  DATABASE_URL=
  CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
```

4. **Database setup**

```bash
cd apps/keystone
npx keystone prisma migrate dev --name init
npx keystone dev --seed-data
```

## 📁 Project Structure

**Monorepo Architecture** - This project uses a monorepo structure with shared dependencies and independent deployment pipelines.

```
trip-planner/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/features/       # Feature-based modules
│   │   │   ├── aichat/         # AI chat functionality
│   │   │   ├── googleMap/      # Maps integration
│   │   │   ├── trip/           # Trip management
│   │   │   └── user/           # User management
│   │   └── src/components/     # Shared UI components
│   └── keystone/               # Keystone CMS backend
│       ├── src/schemas/        # GraphQL schemas
│       └── migrations/         # Database migrations
└── modules/graphql-types/      # Shared GraphQL types
```

## 🔧 Technical Highlights

### AI Integration

- OpenAI GPT-4 with comprehensive error handling
- Database-backed rate limiting with usage analytics
- Optimistic UI updates with rollback capabilities

### Google Maps

- Real-time route calculation with custom styling
- API usage optimization with request deduplication
- Interactive markers and performance optimization

### Database & Performance

- PostgreSQL with Prisma ORM and type safety
- Optimized queries with proper indexing
- Migration-based schema evolution
- Cloudinary CDN for image optimization

### Security & Compliance

- Clerk authentication with JWT validation
- GDPR-compliant data handling with soft deletes
- Rate limiting and input validation
- Secure API endpoints with CORS configuration

## 🛠️ Development

```bash
# Development
npm run dev                   # Start all services
npm run build                 # Build all applications
npm run start                 # Start production server

# Code Quality
npm run lint:eslint          # Run ESLint
npm run lint:prettier        # Run Prettier
npm run lint:eslint:fix      # Fix ESLint issues
```

## 🚀 Deployment

**Full-Stack on Railway**

- **Frontend**: Next.js app deployed on Railway
- **Backend**: Keystone CMS with PostgreSQL database
- **Custom Domain**: routetripper.com via Cloudflare DNS
- **Database**: PostgreSQL with persistent volume storage

## 📊 API Overview

**GraphQL Endpoint**: `/api/graphql`
**Authentication**: JWT Bearer token via Clerk
**Rate Limiting**: User-based limits with usage tracking

**Key Features**:

- User management with usage analytics
- Trip CRUD operations with image upload
- AI chat service with rate limiting
- Real-time usage monitoring

<!-- # - **Portfolio**: [Your Portfolio](https://yourportfolio.com) -->

---

⭐ **Star this repository if you found the architecture helpful!**
