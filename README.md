# 🗺️ Routetripper - AI-Powered Travel Platform

Production-ready full-stack application with AI integration, real-time mapping, and enterprise-grade architecture. Built with Next.js 14, TypeScript, Keystone CMS, and modern development practices.

![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.2.23-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Architecture](https://img.shields.io/badge/Architecture-Monorepo-orange)

## 📋 Table of Contents

- [🚀 Live Demo](#-live-demo)
- [✨ Key Features](#-key-features)
- [🏗️ Technical Architecture](#️-technical-architecture)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Technical Highlights](#-technical-highlights)
- [🛠️ Development](#️-development)
- [🚀 Deployment](#-deployment)
- [📊 API Overview](#-api-overview)
- [📸 Screenshots](#-screenshots)

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

⭐ **Star this repository if you found the architecture helpful!**

---

## 📸 Screenshots

![Homepage](https://private-user-images.githubusercontent.com/37188746/490519014-381d8fa0-1ea5-4730-bd2f-ade1df80aa1a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgxMDkwNzMsIm5iZiI6MTc1ODEwODc3MywicGF0aCI6Ii8zNzE4ODc0Ni80OTA1MTkwMTQtMzgxZDhmYTAtMWVhNS00NzMwLWJkMmYtYWRlMWRmODBhYTFhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE3VDExMzI1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTg0ZTNkNDllNzRkMmZiMTM4ZGNiYmVhMmUxZDY5ODYzODA0ZjNiMjJiNmVkZTgyZWZhOTIwOGMyODhmNTVjMDQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.iJG8PbnJF0ylNtr1OsqEjPuonlqV8z3Ph5KPXr8yjVc)
![Trip Planner](https://private-user-images.githubusercontent.com/37188746/490515796-5c0a1e73-4ff6-426c-b001-ff6c8a09a257.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgxMDkwNzMsIm5iZiI6MTc1ODEwODc3MywicGF0aCI6Ii8zNzE4ODc0Ni80OTA1MTU3OTYtNWMwYTFlNzMtNGZmNi00MjZjLWIwMDEtZmY2YzhhMDlhMjU3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE3VDExMzI1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTAxODQwM2NiYmNhZThmYzNlYWVjOWQ0ZjgzM2IzZjhmYmExMzhhYWYzYjNiMWVjNjg3OWIzZWQxMTUxNTEyYjkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Lz6bdR3hVk5WaPnMkSmRyWKTpQ2V2laeUEqv62J2oDI)
![AI Chat](https://private-user-images.githubusercontent.com/37188746/490516903-c3adbb92-5c8e-44cf-af6d-4a8161c31a0e.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgxMDkwNzMsIm5iZiI6MTc1ODEwODc3MywicGF0aCI6Ii8zNzE4ODc0Ni80OTA1MTY5MDMtYzNhZGJiOTItNWM4ZS00NGNmLWFmNmQtNGE4MTYxYzMxYTBlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE3VDExMzI1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTc0N2QyYzYwN2FmOWFhY2Y0MmRkMGQyZmUxYThkYmFjM2Y1NGQ5NDBjZTFjNThlOWZmNDhjOGY1ODQ5ZTcxNzEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.7_AMuSa0cx-syHEMxwwnMRhA4kmXTXoCUF7Wm8Hrj6A)
![Admin CMS](https://private-user-images.githubusercontent.com/37188746/490517539-96daf0a7-a842-406f-a1e2-674561e70116.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTgxMDkwNzMsIm5iZiI6MTc1ODEwODc3MywicGF0aCI6Ii8zNzE4ODc0Ni80OTA1MTc1MzktOTZkYWYwYTctYTg0Mi00MDZmLWExZTItNjc0NTYxZTcwMTE2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA5MTclMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwOTE3VDExMzI1M1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBjZWIzZDA5ZDYzYWUyODhjYzdmNGFlZDBlNzljZDg0MzhjM2NjZjQwMzEzM2UyMWY5YTljODY0MDg3MGMzYzcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.-6-OJV2z7DPPi5OjrVFx0fCsd0exyuAqJkfKE_zH51s)
