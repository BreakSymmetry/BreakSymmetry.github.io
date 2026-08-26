# Website deployment

The maintained website source lives on the `website` branch of
`BreakSymmetry/BreakSymmetry.github.io`. The same source produces two legally
separate variants; language switching never changes which domain's compliance
information is rendered.

A push to the `website` branch explicitly builds the international `net`
variant and overlays it on the `master` branch, which remains the GitHub Pages
publishing branch. Existing legacy blog URLs are preserved unless a new site
file replaces the same path.

## Domains

- `breaksymmetry.net` is the international site and current canonical origin.
  Its HTML and metadata do not reference the `.cn` domain, Chinese filing
  numbers, or domestic game agreements. Cloudflare may proxy or redirect `www`
  traffic to the apex domain.
- `breaksymmetry.cn` is the intended domestic site. Its build contains the ICP
  and public-security filings plus domestic game agreement links. The domain
  must have an active registration and DNS zone before it can be attached to a
  hosting target.
- Each static build writes exactly one `CNAME`. GitHub Pages therefore publishes
  only the `.net` site; `.cn` needs its own domestic hosting target.

## Local static build

Run `npm run build:static:net` for the international site or
`npm run build:static:cn` for the domestic site. The deployable files are
written to `static-export/`. To preserve two local outputs, set
`STATIC_EXPORT_DIR` to a different directory for one of the commands.
