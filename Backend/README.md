# Portfolio Backend

Minimal Express API scaffold. No database wired up yet — add one when you need it.

## Structure

```
Backend/
  server.js              entry point
  src/
    app.js                express app + middleware + route mounting
    routes/                one file per resource
    controllers/            request handlers
    middleware/              notFound, errorHandler
```

## Run it

```
npm install
cp .env.example .env
npm run dev
```

Server starts on `http://localhost:5000` (or whatever `PORT` is set to).

- `GET /api/health` — sanity check
- `POST /api/contact` — placeholder for the contact form (currently just logs and returns 200; the frontend actually sends contact messages through EmailJS directly, see `Frontend/Portfolio/src/services/emailService.js`)

## Adding a database

Nothing here assumes a specific database. When you're ready, add a `src/config/db.js`
with your connection setup (MySQL, Postgres, Mongo, etc.) and import it from `server.js`
before the app starts listening.
