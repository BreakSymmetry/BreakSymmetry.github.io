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
- `breaksymmetry.cn` is the domestic site. Its build contains the ICP and
  public-security filings plus domestic game agreement links. The legacy Hexo
  project records its hosting target as Tencent Cloud COS bucket
  `page-1305873037` in `ap-shanghai`; the new domestic build should continue to
  publish there after the bucket, custom-domain binding, DNS and HTTPS settings
  are verified.
- Only the `.net` build writes a GitHub Pages `CNAME` file. The `.cn` build does
  not, because its domain mapping belongs in Tencent Cloud COS/CDN rather than
  in the uploaded files.

## Local static build

Run `npm run build:static:net` for the international site or
`npm run build:static:cn` for the domestic site. The deployable files are
written to `static-export/`. To preserve two local outputs, set
`STATIC_EXPORT_DIR` to a different directory for one of the commands.

## Tencent Cloud domestic deployment

1. Build the domestic variant with `npm run build:static:cn`.
2. Upload the contents of `static-export/` to COS bucket `page-1305873037` in
   `ap-shanghai`, preserving paths and the `.well-known` directory.
3. Configure the bucket's static website index and error document as
   `index.html` and `404.html`.
4. Bind `breaksymmetry.cn` in Tencent Cloud COS or CDN, then restore its public
   DNS and HTTPS certificate before directing visitors to the new site.
