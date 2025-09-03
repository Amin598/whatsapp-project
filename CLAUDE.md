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

This is an Expo React Native project with the following key directories:
- `/Whatsapp/` - WhatsApp-related components and features
- Standard Expo project structure with `app.json` configuration

## Platform Support

- iOS
- Android  
- Web (via Expo Web)

## Notes

- Uses Expo managed workflow
- Compatible with Expo Go for development testing
- Supports over-the-air updates via Expo Updates