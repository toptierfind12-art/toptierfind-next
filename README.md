# TopTierFind — Next.js Rebuild

## Stack
- Next.js 14 (App Router)
- Framer Motion (animations)
- Tailwind CSS
- TypeScript
- WordPress REST API (blog posts, live from toptierfind.com)

## Local Dev

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploy to Vercel (Free — ~2 minutes)

1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial Next.js build"
   git remote add origin https://github.com/YOUR_USERNAME/toptierfind-next
   git push -u origin main
   ```

2. Go to https://vercel.com → "Add New Project"
3. Import the GitHub repo
4. Click Deploy — done.
5. You get a free URL like: `toptierfind-next.vercel.app`

## Connecting to WordPress

Blog posts are fetched live from `https://toptierfind.com/wp-json/wp/v2/posts`
- If WP is unreachable, fallback posts are shown automatically
- Cache refreshes every 1 hour (`revalidate: 3600`)

## Popup Sequence

- Shows 4 seconds after page load on first visit
- Step 1: Email capture
- Step 2: Niche survey (6 options)  
- Step 3: Offer + quiz redirect
- localStorage prevents repeat shows
- To test again: clear localStorage key `ttf_popup_shown`

## Sections Checklist

- [x] Hero — animated canvas background, stats, dual CTA
- [x] Quiz Hub — 9-card grid with image overlays
- [x] Shop Categories — asymmetric grid with hover overlays
- [x] Featured Products — 4-card grid, no empty boxes
- [x] Blog Section — WP REST API with fallback
- [x] Popup Sequence — 3-step email → survey → offer
- [x] Footer — links, social, affiliate disclosure
- [x] Navbar — sticky scroll, mobile hamburger

## Color Palette

| Token | Hex |
|-------|-----|
| Navy BG | `#1A1A2E` |
| Navy Light | `#16213E` |
| Navy Card | `#0F3460` |
| Red CTA | `#FF5A5F` |
| Teal Accent | `#00A699` |
| White | `#FFFFFF` |
