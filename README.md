# Next.js 14 Dashboard

A modern dashboard application built with Next.js 14, featuring authentication, internationalization, and theme management.

## Features

- Next.js 14 with App Router
- TypeScript support
- Authentication with NextAuth.js
- Internationalization (EN/PT/ES)
- Theme management (Light/Dark)
- Responsive design
- Tailwind CSS styling

## Prerequisites

- Node.js >= 18.17
- npm or yarn

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env.local` and fill in your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/app
  /(auth)      # Auth routes
  /(dashboard) # Protected routes
  /api         # API endpoints
  /[locale]    # i18n routes
/components
  /ui          # Shared UI
  /features    # Feature components
/lib           # Utils & config
/types         # TS definitions
/public        # Static files
/messages      # Translations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT
