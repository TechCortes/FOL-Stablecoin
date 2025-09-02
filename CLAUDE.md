# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Installation and Setup
```bash
npm run install:all    # Install dependencies for all workspaces
npm run clean          # Clean all node_modules
```

### Development
```bash
npm run dev            # Start both frontend and backend concurrently
npm run dev:frontend   # Start frontend only (port 3000)
npm run dev:backend    # Start backend only (port 3001)
```

### Build and Production
```bash
npm run build          # Build all workspaces
npm run build:frontend # Build frontend only
npm run build:backend  # Build backend only
npm start             # Start production server
```

### Code Quality
```bash
npm run lint          # Lint all workspaces
npm run type-check    # TypeScript validation for all workspaces
```

Individual workspace commands can be run using:
- `npm run <script> --workspace=frontend`
- `npm run <script> --workspace=backend`
- `npm run <script> --workspace=shared`

## Architecture Overview

This is a monorepo using npm workspaces with three packages:

### Frontend (`/frontend`)
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Routing**: React Router v7
- **Development**: Hot reload with Vite, ESLint for linting
- **Build Output**: Static files ready for production deployment

### Backend (`/backend`) 
- **Tech Stack**: Express, TypeScript, SQLite with Kysely ORM
- **Authentication**: JWT-based with bcryptjs for password hashing
- **Security**: CORS, Helmet middleware, input validation with Zod
- **Development**: Hot reload with tsx watch
- **Database**: SQLite for development, migrations handled through Kysely

### Shared (`/shared`)
- **Purpose**: Common TypeScript types and interfaces
- **Key Types**: User, AuthResponse, StablecoinTransaction, Portfolio, ApiResponse
- **Build**: Compiled to `dist/` for consumption by frontend and backend

## Key Architectural Patterns

### API Routes Structure
- `/api/auth` - Authentication endpoints (login, register)
- `/api/users` - User management  
- `/api/transactions` - Stablecoin transaction handling
- `/api/health` - Health check endpoint

### Frontend Organization
- `components/ui/` - Reusable shadcn/ui components
- `components/layout/` - Header, Footer layout components
- `pages/` - Route-based page components
- `contexts/` - React context providers
- `hooks/` - Custom React hooks

### Database Layer
- Uses Kysely ORM for type-safe database queries
- SQLite for local development
- Database initialization handled in `backend/src/database/index.ts`

## Development Workflow

1. **Starting Development**: Run `npm run install:all` then `npm run dev`
2. **Frontend Development**: React app runs on http://localhost:3000
3. **Backend Development**: Express API runs on http://localhost:3001
4. **Type Safety**: Shared types ensure consistency between frontend/backend
5. **Code Quality**: Always run `npm run lint` and `npm run type-check` before commits

## Important Notes

- Node.js >= 18.0.0 and npm >= 9.0.0 required
- CORS configured for localhost:3000 to localhost:3001 communication
- JWT tokens used for authentication between frontend and backend
- All packages use ES modules (`"type": "module"`)
- TypeScript strict mode enabled across all workspaces