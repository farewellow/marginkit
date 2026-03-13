# MarginKit

MarginKit is a self-serve calculator toolkit for importers, resellers, ecommerce sellers, and marketplace operators.

## Tech Stack

- Next.js 15+ (App Router)
- TypeScript (strict)
- Tailwind CSS
- Reusable component architecture

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Run quality checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Environment Variables

Create `.env.local` for local overrides.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical base URL used by metadata, sitemap, and robots. Example: `https://marginkit.app` |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Optional | Analytics mode: `none` (default), `plausible`, or `posthog` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Required when `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` |
| `NEXT_PUBLIC_OG_IMAGE_PATH` | Optional | Override default social image path (default: `/opengraph-image`) |

PostHog note:
- The analytics abstraction supports PostHog events if `window.posthog` is present.
- Add your PostHog bootstrap snippet where indicated in `src/components/analytics/analytics-provider.tsx` when you are ready.

## Deployment

### Vercel (recommended)

1. Import repository into Vercel.
2. Set environment variables in project settings.
3. Deploy from main branch.
4. Confirm these routes resolve in production:
   - `/sitemap.xml`
   - `/robots.txt`
   - `/manifest.webmanifest`
   - `/opengraph-image`
   - `/twitter-image`

### Any Node host

1. Build:

```bash
npm run build
```

2. Start:

```bash
npm run start
```

3. Ensure `NEXT_PUBLIC_SITE_URL` matches the public domain.

## Branding Assets To Replace Before Final Launch

These placeholders are intentionally easy to swap:

- `public/icons/icon.svg`
- `public/icons/icon-maskable.svg`
- `src/app/icon.tsx`
- `src/app/apple-icon.tsx`
- `src/app/opengraph-image.tsx`
- `src/app/twitter-image.tsx`

## SEO and Indexing Notes

- Canonicals are generated via `src/lib/seo/metadata.ts`.
- Sitemap is generated at `/sitemap.xml` via `src/app/sitemap.ts`.
- Robots is generated at `/robots.txt` via `src/app/robots.ts`.
- Main public pages are indexable by default.

## Analytics Readiness

Analytics abstraction is in:

- `src/lib/analytics.ts`
- `src/components/analytics/analytics-provider.tsx`

Included behavior:

- Environment-based provider selection (`none`, `plausible`, `posthog`)
- Pageview tracking hook
- Event tracking helper for existing product events

## Launch Checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Replace icon and social image placeholders
- [ ] Configure analytics provider and keys/domain
- [ ] Run `npm run typecheck`, `npm run lint`, `npm run build`
- [ ] Verify footer links and key navigation routes
- [ ] Verify `robots.txt` and `sitemap.xml` in production
- [ ] Submit sitemap in Google Search Console
