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
  Its HTML and metadata do not reference the domestic domain, Chinese filing
  numbers, or domestic game agreements. Cloudflare may proxy or redirect `www`
  traffic to the apex domain.
- `www.breaksymmetry.online` is the domestic site. Its build contains the ICP and
  public-security filings plus domestic game agreement links. The legacy Hexo
  project records its hosting target as Tencent Cloud COS bucket
  `page-1305873037` in `ap-shanghai`; the new domestic build should continue to
  publish there through its existing EdgeOne hostname.
- Only the `.net` build writes a GitHub Pages `CNAME` file. The `.online` build does
  not, because its domain mapping belongs in Tencent Cloud COS/CDN rather than
  in the uploaded files.
- Domestic legal documents under `/static/` are included only in the `.online`
  export and are removed from the international `.net` export.

## Local static build

Run `npm run build:static:net` for the international site or
`npm run build:static:online` for the domestic site. The deployable files are
written to `static-export/`. To preserve two local outputs, set
`STATIC_EXPORT_DIR` to a different directory for one of the commands.

## Tencent Cloud domestic deployment

1. Build with `npm run build:static:online` and verify that the HTML canonical is
   `https://www.breaksymmetry.online`, the two filing links and game agreements
   are present, and there is no GitHub Pages `CNAME`.
2. Confirm the EdgeOne origin and COS static website routing. Back up existing
   objects that will be updated and inventory all HTML in the bucket. Run
   `python3 scripts/domestic/prepare-legacy.py SNAPSHOT static-export --compatibility-urls` to retain
   legacy HTML at the original object keys while removing Bootstrap and unused
   highlighting references. Review any page that contains a code block.
3. Overlay on `page-1305873037` in `ap-shanghai`. Preserve all other keys and
   keep the live `/static/`, `/app-ads.txt` and `/.well-known/` objects.
   Upload resources before HTML. Set COS object `Cache-Control` metadata to
   `public, max-age=31536000, immutable` for hashed assets and
   `public, max-age=300, must-revalidate` for HTML. Set
   `public, max-age=86400` on the two stable legacy resource URLs. The CSS URL serves the lightweight
   grid and the JavaScript URL provides a no-op for cached Hexo pages. The generated `_headers` file does not configure COS.
4. Purge the changed HTML URLs and the two legacy resource URLs on EdgeOne,
   including both directory URLs and explicit index files. Verify online
   HTTP status, media types, cache headers, article and agreement paths,
   desktop and mobile navigation, and the association JSON.
5. Compare requests and downstream bytes for `/css/bootstrap.min.css` and
   `/js/highlight.pack.js` across equivalent time windows. For each path,
   use EdgeOne Referer, User-Agent, status, and client concentration to
   separate site-page loads from external, direct, and automated requests.
   Empty Referer and user-agent strings alone do not establish intent.
