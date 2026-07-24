# Supabase setup for Presence

Follow these steps in order. ~15 min total.

## 1. Create the Supabase project

1. Go to https://supabase.com/dashboard → **New project**
2. Name: `presence` · Region: closest to you · Set a strong DB password (save it)
3. Wait ~2 min for provisioning.

## 2. Grab your keys

Project → **Settings → API**

Copy these into `.env.local` (create it at the repo root if it doesn't exist):

```
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

The URL + anon key each go in *both* `SUPABASE_*` and `NEXT_PUBLIC_SUPABASE_*` — server code uses one, client code uses the other. Never commit the service role key.

## 3. Run the schema migration

Project → **SQL Editor → New query** → paste the contents of `supabase/migrations/0001_init.sql` → **Run**.

Creates: `profiles`, `analyses`, `creators`, `ideas` tables with row-level security scoped to `auth.uid()`.

## 4. Enable Google sign-in

Project → **Authentication → Providers → Google → Enable**

You need a Google OAuth client:

1. Go to https://console.cloud.google.com/apis/credentials
2. **Create Credentials → OAuth client ID** → Web application
3. **Authorized redirect URIs**: paste the callback URL that Supabase shows you (looks like `https://xxxxxxxxxxx.supabase.co/auth/v1/callback`)
4. Copy Client ID + Client Secret back into Supabase's Google provider settings → save

Then, in Supabase → **Authentication → URL Configuration**:
- **Site URL**: `https://getpresence.vercel.app`
- **Redirect URLs**: add `http://localhost:3000/**` and `https://getpresence.vercel.app/**`

## 5. Restart your dev server

```
npm run dev
```

Sign in at http://localhost:3000/login and you should land in `/app`.

## What's live before you finish this?

Everything renders and navigates locally without Supabase env vars — auth-gated pages just show a "connect Supabase" notice instead of crashing. You can build/preview the UI now and enable it live once the env vars are in place.
