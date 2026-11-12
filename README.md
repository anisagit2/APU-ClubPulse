# APU ClubPulse

APU ClubPulse is a campus clubs and events hub for Asia Pacific University. Browse campus events, find clubs, take a club-matching quiz, and save events to your schedule.

**Live site:** [apu-club-pulse.vercel.app](https://apu-club-pulse.vercel.app/)

## Features

- Browse, search, and filter campus events.
- Save events and add them to Google Calendar or download an `.ics` file.
- Explore APU clubs and take a quiz to find clubs that match your interests.
- RSVP through the in-app demo form.

> **RSVP notice:** This is a front-end demo. RSVP status is saved in the current browser only; registration details are not sent to event organizers or stored on a server.
>
> Club and event data are sample data. Instagram links open Instagram's homepage rather than verified club accounts.

## Requirements

- Node.js 20.19+ (or 22.12+)
- Bun (recommended; the repository includes `bun.lock`)

## Run locally

With Bun:

```bash
bun install
bun run dev
```

Or with npm:

```bash
npm install --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation and production build

```bash
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`.

## Vercel deployment

The app is deployed at [https://apu-club-pulse.vercel.app/](https://apu-club-pulse.vercel.app/). Vercel can deploy updates automatically whenever changes are pushed to the connected Git branch.

## Architecture and data

The current app is a client-side React application. It has no application API or database: the bundled sample data is loaded in the browser, and user changes are persisted in `localStorage` on that device.

### Layers

| Layer | Location | Responsibility |
| --- | --- | --- |
| Presentation | `src/components/` | Event feed, club directory, quiz, saved events, and modal UI |
| Application state | `src/App.tsx` and component state | Active view, selected club, saved events, and user interactions |
| Domain types | `src/types.ts` | TypeScript models for clubs, events, and quiz results |
| Sample data | `src/data/` | Initial club, event, and quiz-question data |
| Utilities | `src/utils/` | Calendar-link/ICS generation and quiz matching |
| Browser persistence | `localStorage` | Events, saved event IDs, and RSVP status for this browser |
| Hosting | Vercel | Serves the built static frontend |

### Key data structures

- `Club`: identity, category, description, Instagram handle, meeting details, and contact information.
- `CampusEvent`: title, organizer, date/time, venue, category, description, registration link, fee, capacity, and tags.
- `QuizQuestion` and `QuizResult`: quiz options with club weights, and the resulting club match scores.

Initial records live in `src/data/clubsData.ts`, `src/data/eventsData.ts`, and `src/data/quizData.ts`; their shapes are defined in `src/types.ts`. The browser currently stores event edits and saved IDs in `apu_events_list` and `apu_saved_event_ids`. RSVP status is stored in `apu_registered_event_ids`; form details are not submitted or retained.

## Google Calendar API

The current **Google Calendar** action creates a pre-filled Google Calendar website link, and the app can download an `.ics` file. Neither action uses the Google Calendar API or connects a user's Google account.

To create events directly in a signed-in user's calendar, add an OAuth flow and call the Calendar API:

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/) and enable the [Google Calendar API](https://console.cloud.google.com/marketplace/product/google/calendar-json.googleapis.com).
2. Configure the OAuth consent screen and add test users while the app is in testing.
3. Create an OAuth client ID for a **Web application**. Add these authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://apu-club-pulse.vercel.app`
4. For a backend authorization-code flow, also register the exact redirect URI(s) that the backend implements, for example:
   - `http://localhost:3000/api/auth/google/callback`
   - `https://apu-club-pulse.vercel.app/api/auth/google/callback`
5. Ask the user to sign in and consent to the narrow `https://www.googleapis.com/auth/calendar.events` scope. Keep the OAuth `state` check and securely associate the resulting tokens with that user.
6. With the user's authorization, have the backend call the [Calendar `events.insert` endpoint](https://developers.google.com/calendar/api/v3/reference/events/insert), typically for the user's `primary` calendar. Send event start/end values with an explicit time zone such as `Asia/Kuala_Lumpur`.
7. Test with your own account and configured test users before publishing. Google may require verification for broader distribution or sensitive scopes; follow the current [Google OAuth web-server flow guide](https://developers.google.com/identity/protocols/oauth2/web-server).

Do not put a Google client secret, refresh token, or service-account key in frontend code or any `VITE_` environment variable. A service account does not automatically grant access to each visitor's personal calendar; use user OAuth for that use case.

## Adding and deploying a backend

There is no backend in this repository yet. For this Vercel-hosted frontend, a straightforward option is to add Vercel Functions in an `api/` directory and deploy them with the same project:

1. Add server-side API handlers for OAuth start/callback and event creation. Keep Google token exchange and Calendar API calls on the server.
2. Configure required secrets and settings in **Vercel Project → Settings → Environment Variables** (and local-only values in `.env.local`, which must not be committed). For example: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, a session-signing secret, and database connection settings if needed.
3. Use a persistent database for user sessions, encrypted OAuth refresh tokens, and registrations if these need to survive across devices. Do not rely on function memory or local files for persistent state.
4. Have the frontend call same-origin routes such as `/api/events` and `/api/auth/google`; check authentication, validate inputs, and return meaningful errors.
5. Deploy through the existing Git-connected Vercel project. Set production environment variables, redeploy, then add the production callback URL to the Google OAuth client. Keep separate local/development and production OAuth settings where appropriate.

See the [Vercel Functions documentation](https://vercel.com/docs/functions) and [Vercel environment variables guide](https://vercel.com/docs/environment-variables) for platform-specific setup. If you choose a separate backend host instead, configure its URL, HTTPS, CORS allowlist, secrets, and OAuth redirect URI there, then point the frontend to that API.

## Tech stack

### Frontend

- **React 19** for the UI and component state.
- **TypeScript** for typed components and domain models.
- **Vite** for development and production builds.
- **Tailwind CSS 4** for styling.
- **Lucide React** for icons and **Motion** for animation.
- Browser `localStorage` for device-local demo persistence.

### Hosting and planned services

- **Vercel** currently hosts the static frontend.
- **Google Calendar API and OAuth** are not connected yet; direct calendar creation requires the integration described above.
- **Vercel Functions and a persistent database** are backend options to add; neither is currently configured.
