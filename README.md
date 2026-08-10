# Weeboo

Production website and project-request infrastructure for Weeboo.

## Local development

```bash
npm ci
npm run dev
```

## Production verification

```bash
npm run check
npm test
npm run build
npm start
```

The production server serves the optimized Vite build from `dist`, exposes
`GET /api/health`, and accepts validated project requests at
`POST /api/project-requests`.

## Required production infrastructure

Create a managed PostgreSQL database and provide `DATABASE_URL`. The server
creates the `project_requests` table and indexes during startup.

For confirmation and notification emails, configure a verified Resend domain
and provide `RESEND_API_KEY`, `FROM_EMAIL`, and `LEAD_NOTIFICATION_EMAIL`.
Requests remain securely stored if email delivery is temporarily unavailable.

See `.env.example` for all runtime variables. Secrets must be configured in
Replit Secrets and must never be committed.

## Replit deployment

Use an Autoscale deployment because the site contains a server API.

- Build command: `npm ci && npm run build`
- Run command: `npm start`
- Health endpoint: `/api/health`
- Runtime port: the `PORT` environment variable supplied by Replit

The `.replit` file contains the same build and run configuration.
