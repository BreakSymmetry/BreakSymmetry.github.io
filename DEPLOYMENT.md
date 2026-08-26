# Website deployment

The maintained website source lives on the `website` branch of
`BreakSymmetry/BreakSymmetry.github.io`. A push to that branch builds a static
snapshot and overlays it on the `master` branch, which remains the GitHub Pages
publishing branch. Existing legacy blog URLs are preserved unless a new site
file replaces the same path.

## Domains

- `breaksymmetry.net` is the GitHub Pages custom domain and current canonical
  origin. Cloudflare may proxy or redirect `www` traffic to the apex domain.
- `breaksymmetry.cn` is intended for the domestic deployment. It must have an
  active registration and DNS zone before it can be attached to a hosting
  target. A second domain cannot be added to the GitHub Pages `CNAME` file;
  GitHub requires additional domains to be redirected by the DNS provider.

## Local static build

Run `npm run build:static`. The deployable files are written to
`static-export/`.
