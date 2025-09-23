# Shopify Integration App

A Next.js application that enables easy integration with Shopify stores through OAuth authentication and API access.

## Features

- **Shopify OAuth Integration**: Secure authentication flow with Shopify stores
- **Store Connection**: Simple form to connect any Shopify store by domain
- **Dashboard Interface**: User-friendly dashboard for managing Shopify integration
- **Supabase Integration**: Backend storage and authentication management
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Current Implementation

The app currently includes:

- **Landing Page** (`/`): Clean interface for entering Shopify store domain
- **Authentication Flow**: OAuth start endpoint (`/api/auth/start`) and callback handling
- **Dashboard**: Post-authentication dashboard for store management
- **Error Handling**: Dedicated error and success pages
- **Utilities**: Helper functions for Shopify API integration

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Styling**: Tailwind CSS
- **Backend**: Supabase for authentication and data storage
- **Authentication**: Shopify OAuth 2.0
- **Language**: TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (Shopify API keys, Supabase credentials)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/app/
├── api/auth/           # Authentication endpoints
│   ├── start/          # OAuth initiation
│   └── callback/       # OAuth callback handling
├── dashboard/          # Post-auth dashboard
├── error/              # Error handling pages
├── success/            # Success confirmation pages
└── utils/              # Helper utilities
```

## Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Start**: `npm run start` (production)

## Next Steps

- Complete Shopify API integration
- Add product management features
- Implement webhook handling
- Add comprehensive error handling
- Deploy to production environment