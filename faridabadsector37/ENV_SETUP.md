# Environment Variables Setup

## Frontend Environment Variables

The frontend uses Vite, which requires environment variables to be prefixed with `VITE_` to be exposed to the client-side code.

### Required Variables

Create a `.env` file in the `frontend` directory with the following:

```env
# API Base URL - Backend server URL
# For local development:
VITE_API_BASE_URL=http://localhost:5000

# For production (replace with your actual backend URL):
# VITE_API_BASE_URL=https://api.yourdomain.com
```

### Development vs Production

**Local Development:**
```env
VITE_API_BASE_URL=http://localhost:5000
```

**Production:**
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Important Notes

1. **Vite Environment Variables**: All environment variables must be prefixed with `VITE_` to be accessible in the frontend code.
2. **Build Time**: Environment variables are embedded at build time, not runtime. You need to rebuild the application if you change them.
3. **No Sensitive Data**: Never commit sensitive data like API keys in environment variables. The `.env` file is already in `.gitignore`.

### Usage in Code

The API base URL is configured in `src/utils/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

All API calls use the centralized `api` utility which automatically uses the configured base URL.
