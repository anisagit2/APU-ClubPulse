# APU ClubPulse

APU ClubPulse is a campus clubs and events hub for Asia Pacific University. Browse campus events, find clubs, take a club-matching quiz, and save events to your schedule.

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

## Deploy to Vercel

Import this repository into Vercel and use:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

Vercel can deploy automatically whenever changes are pushed to the connected Git branch.

## Tech stack

React, TypeScript, Vite, Tailwind CSS, and Lucide React.
