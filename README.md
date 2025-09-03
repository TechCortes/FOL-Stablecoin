# FOL Capital - Institutional-Grade stablecoin solution for high unemployment rate due to AI and improving workforce development.

A modern, professional platform for institutional stablecoin services built with React, TypeScript, and Express.

# Architecture

```
FOL-Clean/
├── frontend/          # React + Vite + TypeScript
├── backend/           # Express + TypeScript API
├── shared/           # Shared types & utilities
└── package.json      # Workspace management
```

##  Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Development

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend in development mode
npm run dev

# Or run individually:
npm run dev:frontend  # Frontend on http://localhost:3000
npm run dev:backend   # Backend on http://localhost:3001
```

### Production

```bash
# Build everything
npm run build

# Start production server
npm start
```

## Development

### Frontend (Port 3000)
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** + **shadcn/ui** components
- **React Router** for navigation
- **Modern ESLint** configuration

### Backend (Port 3001)
- **Express** with TypeScript
- **SQLite** with **Kysely** ORM
- **JWT Authentication**
- **CORS** and security middleware
- **Development hot reload** with tsx

### Code Quality
```bash
npm run lint         # Lint all workspaces
npm run type-check   # TypeScript validation
```

## Project Structure

### Frontend (`/frontend`)
```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── layout/      # Layout components
├── pages/           # Page components
├── contexts/        # React contexts
├── hooks/           # Custom hooks
├── lib/            # Utilities & configurations
└── types/          # TypeScript types
```

### Backend (`/backend`)
```
src/
├── routes/         # API route handlers
├── middleware/     # Express middleware
├── database/       # Database schema & migrations
├── types/          # TypeScript types
├── utils/          # Utility functions
└── config/         # Configuration
```

## Key Features

- **Institutional Focus** - Built for enterprise clients
- **Secure Authentication** - JWT-based auth system
- **Responsive Design** - Works on all devices
- **Fast Development** - Hot reload, TypeScript, modern tooling
- **Type Safety** - Full TypeScript coverage
- **Modern UI** - shadcn/ui components with Tailwind CSS

## Author

**Jorge Cortes** - Institutional Finance Platform

---

Built with ❤️ using modern web technologies
