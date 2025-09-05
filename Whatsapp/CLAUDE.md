
# CLAUDE.md 

this file provides guidance to claude code (claude.ai/code) when working with code in this repository

# Project overview

WhatsApp is a mobile app for iOS and Android phones inspired by the actual WhatsApp app from Meta. Currently implemented as a complete authentication system with modern React Native architecture.

# Claude Code Configuration

This is an Expo React Native project.

## Development Commands

```bash
# Start the development server
npm start
# or
yarn start
# or
expo start

# Start with specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Build for production
npx expo build:ios
npx expo build:android

# Install dependencies
npm install
# or
yarn install

# Clear cache
npx expo start --clear

# Update Expo CLI
npm install -g @expo/cli
```

## Testing Commands

```bash
# Run tests
npm test
# or
yarn test

# Run tests with coverage
npm run test:coverage
# or
yarn test:coverage
```

## Linting Commands

```bash
# Run ESLint
npm run lint
# or
yarn lint

# Fix ESLint errors
npm run lint:fix
# or
yarn lint:fix
```

## Project Structure

```
app/
├── (auth)/              # Authentication routes (protected)
│   ├── _layout.tsx       # Auth layout with redirect logic
│   ├── sign-in.tsx       # Email/password login
│   └── sign-up.tsx       # Registration + 6-digit email verification
├── (home)/               # Main app routes (protected)
│   ├── _layout.tsx       # Home layout with auth guard
│   └── index.tsx         # Dashboard/home screen
├── components/           # Shared components
│   ├── SignOutButton.tsx # Sign out with confirmation
│   ├── WelcomeIllustration.tsx # Custom welcome graphics
│   └── ErrorBoundary.tsx # Error handling wrapper
├── _layout.tsx          # Root layout with Clerk provider
└── index.tsx            # Welcome/landing screen

components/              # Additional shared components
constants/              # Colors and theme constants
assets/                 # Images, icons, fonts
.claude/agents/         # Custom Claude Code agents
```

## Platform Support

- iOS
- Android  
- Web (via Expo Web)

## Authentication Setup

This project uses **Clerk** for complete authentication management.

### Current Features:
- Email/password registration with email verification
- 6-digit email verification codes
- Sign-in/sign-out functionality
- Protected routes with automatic redirects
- Session management and token caching
- Loading states and error handling

### Authentication Flow:
1. **Welcome Screen** → Choose sign up or sign in
2. **Sign Up** → Email/password → Email verification → Home
3. **Sign In** → Email/password → Home
4. **Protected Routes** → Automatic redirect based on auth state

### Architecture:
- **Authentication**: Clerk with email/password strategy
- **State Management**: Clerk's built-in auth state + React Context
- **Navigation**: Expo Router with file-based routing
- **Route Protection**: Layout-based auth guards
- **Session Persistence**: Clerk token cache
- **UI Components**: Custom WhatsApp-style components

## Current Implementation Status

### ✅ Completed Features:
- Complete authentication system (Clerk integration)
- Welcome screen with WhatsApp-style UI
- Email registration with verification
- Sign-in/sign-out functionality
- Protected route system
- Error handling and loading states
- Navigation with gesture support
- Custom UI components and theming

### 🚧 Next Steps:
- Messaging system implementation
- Contacts management
- Chat interface
- Real-time messaging
- Media sharing
- Voice/video calls
- Push notifications

## Technical Notes

- Uses Expo managed workflow (~53.0.22)
- React Native 0.79.5 with React 19.0.0
- Compatible with Expo Go for development testing  
- Supports over-the-air updates via Expo Updates
- TypeScript enabled with strict mode
- ESLint configured for code quality
- New React Native architecture enabled

# Agent Integration & Documentation

## Code Documentation Agent
This project has a specialized `code-documenter` agent that MUST be used automatically after every significant code change. The agent is located at `.claude/agents/code-documenter.md`.

### Agent Usage Rules:
- **AUTOMATICALLY** use the code-documenter agent after implementing new features
- **AUTOMATICALLY** use the code-documenter agent after refactoring existing code  
- **AUTOMATICALLY** use the code-documenter agent after architectural changes
- **AUTOMATICALLY** use the code-documenter agent after adding new components

### Implementation Workflow:
1. Complete the requested code changes
2. **IMMEDIATELY** invoke the code-documenter agent using the Task tool
3. Provide comprehensive documentation explaining:
   - What was changed and why
   - How the implementation works
   - Integration points with existing code
   - Testing considerations and next steps

This ensures every development session maintains a complete, educational record of all changes made to the WhatsApp clone project.

# Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
**ALWAYS** use the code-documenter agent after completing significant code changes.