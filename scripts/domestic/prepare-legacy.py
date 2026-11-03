"""Prepare updated Hexo HTML from a snapshot of the current domestic site."""
import argparse
from hashlib import sha256
from pathlib import Path
import re

BOOTSTRAP = re.compile(rb'(<link\s+rel="stylesheet"\s+href=")/css/bootstrap\.min\.css(">)')
HIGHLIGHT = re.compile(
    rb'<script\s+src="/js/highlight\.pack\.js"></script>\s*'
    rb'<script>[^<]*hljs\.highlightBlock\(block\);[^<]*</script>'
)
CSS_DIR = Path(__file__).resolve().parent


def prepare(source, output, compatibility_urls=False):
    css = (CSS_DIR / "legacy-layout.css").read_bytes()
    name = f"legacy-layout.{sha256(css).hexdigest()[:12]}.css"
    css_path = output / "css" / name
    css_path.parent.mkdir(parents=True, exist_ok=True)
    css_path.write_bytes(css)
    count = 0
    for html in sorted(source.rglob("*.html")):
        key = html.relative_to(source)
        if key.parts[0] in {"static", ".well-known"} or (output / key).exists():
            continue
        old = html.read_bytes()
        if b"bootstrap.min.css" not in old and b"highlight.pack.js" not in old:
            continue
        if re.search(rb"<pre(?:\s|>)", old, re.I):
            raise ValueError(f"{key} contains a code block and needs review")
        new = BOOTSTRAP.sub(rb"\g<1>/css/" + name.encode("ascii") + rb"\2", old)
        new = HIGHLIGHT.sub(b"", new)
        if any(ref in new for ref in (b"bootstrap.min.css", b"highlight.pack.js", b"hljs.highlightBlock")):
            raise ValueError(f"Unrecognized legacy asset references in {key}")
        target = output / key
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(new)
        count += 1
    if compatibility_urls:
        (css_path.parent / "bootstrap.min.css").write_bytes(css)
        highlight = output / "js" / "highlight.pack.js"
        highlight.parent.mkdir(parents=True, exist_ok=True)
        highlight.write_bytes(
            b"/* Compatibility for cached Hexo pages without code blocks. */\n"
            b"window.hljs = window.hljs || { highlightBlock: function () {} };\n"
        )
    return count


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("snapshot", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--compatibility-urls", action="store_true")
    args = parser.parse_args()
    print(f"Prepared {prepare(args.snapshot, args.output, args.compatibility_urls)} legacy pages")
