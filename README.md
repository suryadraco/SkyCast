# Global Compass

A modern dashboard application built with React and TypeScript.

## Getting Started

### Prerequisites

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to get started:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Set up environment variables (see API Keys section below)
cp .env.example .env
# Edit .env and add your API keys if needed

# Step 5: Start the development server with auto-reloading and an instant preview
npm run dev
```

## API Keys Configuration

This application uses several APIs. Most are free and don't require API keys, but one optional API key is recommended for production use.

### Required API Keys

**None** - The application works without any API keys!

### Optional API Keys (Recommended for Production)

#### 1. IPAPI.co API Key (Optional)
- **Purpose**: Geolocation service for detecting user location
- **Required**: No (works without it, but limited to 1,000 requests/day)
- **With API Key**: 10,000 requests/day
- **Get API Key**: https://ipapi.co/signup/
- **Environment Variable**: `VITE_IPAPI_KEY`

**To use:**
1. Sign up at https://ipapi.co/signup/
2. Get your API key from the dashboard
3. Add it to your `.env` file:
   ```
   VITE_IPAPI_KEY=your_api_key_here
   ```

### APIs Used (No Keys Required)

1. **IPWho.is** - Fallback geolocation service (free, no key needed)
2. **Open-Meteo** - Weather API (completely free, unlimited)
3. **Hacker News Algolia API** - News service (free, public API)

### Environment Variables Setup

1. Copy the example environment file:
   ```sh
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```env
   VITE_IPAPI_KEY=your_api_key_here
   ```

3. For Vercel deployment, add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `VITE_IPAPI_KEY` with your API key value

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

For detailed API documentation, see [apikey.md](./apikey.md).

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Technologies

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

### Build for Production

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Deploy to Vercel

1. **Using Vercel CLI:**
   ```sh
   npm install -g vercel
   vercel
   ```

2. **Using GitHub Integration:**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com) and import your repository
   - Add environment variables in Vercel dashboard (Settings → Environment Variables)
   - Deploy

3. **Environment Variables on Vercel:**
   - Go to your project settings on Vercel
   - Navigate to "Environment Variables"
   - Add `VITE_IPAPI_KEY` with your production API key value
   - Redeploy after adding variables

The `vercel.json` file is already configured for optimal deployment.
