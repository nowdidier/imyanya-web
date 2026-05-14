# Deployment and OAuth Checklist

This app intentionally calls the API through the same-origin `/api/` path.

- Local development: CRACO proxies `/api/*` to Koyeb.
- Vercel: `vercel.json` rewrites `/api/*` to Koyeb.
- Cloudflare Pages: `public/_worker.js` proxies `/api/*` to Koyeb and serves React assets through `env.ASSETS`.

Do not use Cloudflare `_redirects` to proxy `/api/*` to Koyeb. Cloudflare Pages only supports `200` proxying to relative URLs on your site, so the API proxy must be a Pages Function or `_worker.js`.

## Vercel

- Build command: `npm run build:fast`
- Output directory: `build`
- Keep `vercel.json` in the repository root.
- Add the required `REACT_APP_*` variables in Project Settings > Environment Variables for Production and Preview. Create React App reads these at build time, so redeploy after changing them.

## Cloudflare Pages

- Build command: `npm run build:fast`
- Build output directory: `build`
- `public/_worker.js` is copied into `build/_worker.js` and supports both Git/Wrangler deployments and dashboard drag-and-drop deployments.
- Add the required `REACT_APP_*` variables in Workers & Pages > your project > Settings > Variables and Secrets.
- `BACKEND_URL` can be set there too; `wrangler.toml` already provides the Koyeb default.

## Google OAuth

In Google Cloud Console > APIs & Services > Credentials > your Web OAuth client, add every deployed frontend origin under Authorized JavaScript origins.

Use origins only, with no path or trailing route:

- `https://imyanya.rw`
- `https://employers.imyanya.rw`
- `https://<your-vercel-project>.vercel.app`
- `https://<your-cloudflare-project>.pages.dev`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Google does not accept wildcard origins. Each preview/deployment hostname that users sign in from must be added, or you should sign in only from stable custom domains.

## Facebook OAuth

In Meta for Developers, add the production domains to App Domains and configure Facebook Login settings for the same deployed origins. If you switch from popup login to redirect login, add the exact redirect URI used by the library or backend callback.

## Security Note

Values prefixed with `REACT_APP_` are bundled into the browser. Public IDs such as Google client ID and Firebase config are expected, but provider client secrets should live on the backend, not in the React app. Rotate any provider/backend client secrets that have been deployed in a frontend bundle.
