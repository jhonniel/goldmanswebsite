# Goldman’s Supply Corporation

Official single-page website for Goldman’s Supply Corporation.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Configuration

Update company details, SEO copy, and contact information in:

- `src/config/company.ts`
- `.env`
- `src/data/services.ts`
- `src/data/industries.ts`
- `src/data/news.ts` — achievements and social-media acknowledgements, with images in `public/images/news/`

Product categories in `src/data/services.ts` must be confirmed by management before publication. Do not add named clients, project values, or a D-U-N-S number unless management asks for them. Add the verified telephone number in `company.phone` and set `phoneIsPlaceholder` to `false` only after it matches current D&B and legal records.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Live website URL used for canonical tags, Open Graph, `robots.txt`, and `sitemap.xml` |
| `VITE_CONTACT_API_URL` | Optional contact form endpoint. Defaults to `/api/contact` |
| `RESEND_API_KEY` | Server-only. Sends the inquiry to `info@goldmanssupply.com` and a thank-you email to the sender |
| `CONTACT_TO_EMAIL` | Server-only destination email. Defaults to `info@goldmanssupply.com` |
| `CONTACT_FROM_EMAIL` | Server-only From address. The sending domain must be verified in Resend |
| `VITE_GOOGLE_SITE_VERIFICATION` | Google Search Console verification code |
| `VITE_GA_MEASUREMENT_ID` | Optional Google Analytics ID. Analytics cookies load only after the visitor accepts cookies |

Set `VITE_SITE_URL` to the live domain before launch.

## Deploy on Vercel

This is a Vite static site. Vercel builds `npm run build` and serves `dist`.

1. Push this project to GitHub, GitLab, or Bitbucket.
2. In [Vercel](https://vercel.com/new), import the repository.
3. Keep the Vite defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add environment variables as needed:
   - `VITE_SITE_URL` — live domain, for example `https://your-project.vercel.app`
   - `RESEND_API_KEY` — required so the contact form can email `info@goldmanssupply.com` and send the visitor a thank-you message
   - `CONTACT_TO_EMAIL` — optional override of the company inbox
   - `CONTACT_FROM_EMAIL` — From address on a domain verified in Resend
   - `VITE_CONTACT_API_URL` — optional contact endpoint override
   - `VITE_GOOGLE_SITE_VERIFICATION` — optional Search Console code
   - `VITE_GA_MEASUREMENT_ID` — optional Analytics ID
5. Deploy.

Or from this folder:

```bash
npx vercel
```

Use `npx vercel --prod` for a production deploy. If `VITE_SITE_URL` is not set, the site uses the Vercel deployment URL for SEO tags.

## Google Search

After the website is online:

1. Open [Google Search Console](https://search.google.com/search-console).
2. Add the live domain and paste the verification code into `VITE_GOOGLE_SITE_VERIFICATION`.
3. Submit `https://your-domain.com/sitemap.xml`.
4. Confirm `https://your-domain.com/robots.txt` allows crawling.
