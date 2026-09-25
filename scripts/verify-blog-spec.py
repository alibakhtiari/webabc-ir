import re, sys, json

BASE = "src/content/blog/en/"

def load(f):
    raw = open(BASE + f, encoding="utf-8").read()
    e = raw.find("\n---", 3)
    fm = raw[:e]; b = raw[e + 4:] if e > 0 else ""
    return raw, fm, b

def words_of(b):
    body = re.sub(r"```.*?```", "", b, flags=re.S)
    body = re.sub(r"<[^>]+>", "", body)
    body = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", body)
    body = re.sub(r"[#*`\-]>", "", body)
    return len(body.split())

def check(f, baseline_links):
    bad = []
    raw, fm, b = load(f)
    t = re.search(r"^title:\s*(.+)$", fm, re.M)
    d = re.search(r"^description:\s*(.+)$", fm, re.M)
    t = t.group(1).strip().strip("'\"") if t else ""
    d = d.group(1).strip().strip("'\"") if d else ""
    w = words_of(b)
    if w < 1500 and "DO_NOT_PAD" not in f: bad.append(f"{w} words (<1500)")
    if w > 2400: bad.append(f"{w} words (>2400)")
    if len(t) > 60: bad.append(f"title {len(t)}ch (>60)")
    if not (150 <= len(d) <= 160): bad.append(f"desc {len(d)}ch (want 150-160)")
    if not re.search(r"^updatedDate:\s*2026-09-23", fm, re.M): bad.append("updatedDate not 2026-09-23")
    if "keyTakeaways:" not in fm: bad.append("keyTakeaways MISSING")
    if re.search(r"^faq:", fm, re.M) is None: bad.append("faq MISSING")
    if re.search(r"^image:", fm, re.M) is None: bad.append("image MISSING")
    if re.search(r"^category:", fm, re.M) is None: bad.append("category MISSING")
    if re.search(r"^date:", fm, re.M) is None: bad.append("date MISSING")
    nofence = re.sub(r"```.*?```", "", b, flags=re.S)
    if re.search(r"^# ", nofence, re.M): bad.append("stray H1 in body")
    # readTime
    rt = re.search(r"^readTime:\s*(\d+)", fm, re.M)
    want = max(1, round(w / 200))
    if not rt: bad.append(f"readTime MISSING (want {want})")
    elif int(rt.group(1)) != want: bad.append(f"readTime {rt.group(1)} != {want}")
    # keyTakeaways / faq counts
    kt = re.search(r"^keyTakeaways:\n((?:  - .*\n)+)", fm, re.M)
    nkt = len(re.findall(r"^  - ", kt.group(1), re.M)) if kt else 0
    if not (4 <= nkt <= 5): bad.append(f"keyTakeaways {nkt} items (want 4-5)")
    fq = len(re.findall(r"^  - question:", fm, re.M))
    if not (3 <= fq <= 5): bad.append(f"faq {fq} items (want 3-5)")
    # links preserved
    links = re.findall(r"\]\((/en/[^)]*)\)", b)
    missing = [l for l in baseline_links if l not in links]
    if missing: bad.append(f"LOST links: {missing}")
    # body --- count
    nhr = len([l for l in b.split("\n") if l.strip() == "---"])
    if nhr > 1: bad.append(f"{nhr} horizontal rules in body (max 1)")
    # H2 openers 40-60 words
    lines = b.split("\n")
    h2info = []
    for i, ln in enumerate(lines):
        if re.match(r"^## ", ln):
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j >= len(lines):
                bad.append(f"H2 no text at all: {ln[:50]}")
                continue
            opener = []
            while j < len(lines) and lines[j].strip():
                opener.append(lines[j].strip())
                j += 1
            first = opener[0]
            if first.startswith(("-", ">", "<", "```", "{", "!", "|", "1.", "2.", "3.", "4.", "5.")):
                bad.append(f"H2 opener not prose ({first[:25]!r}): {ln[:50]}")
                continue
            ow = words_of(" ".join(opener))
            h2info.append((ow, ln))
            if not (40 <= ow <= 60):
                bad.append(f"H2 opener {ow}w (want 40-60): {ln[:60]}")
    # paragraphs <= 150 words
    para = []
    cur = []
    for ln in b.split("\n"):
        s = ln.strip()
        if not s:
            if cur: para.append(" ".join(cur)); cur = []
            continue
        if s.startswith(("#", "-", ">", "```", "|", "{", "<", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.")):
            if cur: para.append(" ".join(cur)); cur = []
        else:
            cur.append(s)
    if cur: para.append(" ".join(cur))
    for p in para:
        pw = words_of(p)
        if pw > 150: bad.append(f"paragraph {pw}w (>150): {p[:60]!r}")
    return dict(file=f, words=w, title_len=len(t), desc_len=len(d), h2=len(h2info), bad=bad)

if __name__ == "__main__":
    # Usage: python3 scripts/verify-blog-spec.py [manifest.json]
    # The manifest is a [[slug, [internal links at HEAD]], ...] list used to prove
    # that no rewrite dropped an internal link (spec section 1).
    manifest = sys.argv[1] if len(sys.argv) > 1 else "scripts/blog-links-baseline.json"
    specs = json.load(open(manifest, encoding="utf-8"))
    rows = []
    for f, base_links in specs:
        rows.append(check(f, base_links))
    for r in rows:
        status = "PASS" if not r["bad"] else "FAIL"
        print(f"{r['file']}: words={r['words']} title={r['title_len']} desc={r['desc_len']} h2={r['h2']} -> {status}")
        for x in r["bad"]:
            print(f"    - {x}")
