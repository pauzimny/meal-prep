# Meal Prep Monorepo

A full-stack meal planning app using React, Vite, NestJS, Supabase, and OpenAI.
Prerequisites:

- Node.js (v18+ recommended)
- pnpm (recommended for monorepo)
- Supabase CLI (for local development)
- OpenAI API key

## Getting Started

1. Install dependencies

```js
pnpm install
```

2. Setup Environment Variables

- Backend (apps/backend):<br>
  Create a `.env` file in `apps/backend` with:

```
OPENAI_API_KEY=<your-openai-api-key>
PORT=3001
```

- Frontend (apps/frontend): <br>
  Create a `.env` file in `apps/frontend` with:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

3. Supabase Setup

- Initialize Supabase (if not already):

```
cd apps/frontend
supabase init
```

- Start Supabase locally

```
supabase start
```

- Apply migrations

```
supabase db reset
```

This will run all SQL files in apps/frontend/supabase/migrations/.

- Get your local Supabase URL and anon key:<br>
  Run `supabase status` or check the output of `supabase start`.
  Update your frontend `.env` with these values.

## Running the Apps 🚀

```js
pnpm run dev
```
