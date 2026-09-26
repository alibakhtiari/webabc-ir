#!/usr/bin/env python3
"""Per-heading prose passage band report for blog MDX files (AEO audit helper).

A "passage" = the prose paragraphs under one heading (## or ###) until the next
heading, excluding lists, tables, code fences and blockquotes (reported separately).
"""
import re, sys

FM = 'frontmatter'

def units_of(body):
    body = re.sub(r'```.*?```', '', body, flags=re.S)
    out, kind, cur = [], None, []
    def flush():
        if kind and cur:
            out.append((kind, '\n'.join(cur).strip()))
    for ln in body.split('\n'):
        if re.match(r'^#{2,3} ', ln):
            flush()
            lvl = 'h2' if ln.startswith('## ') else 'h3'
            out.append((lvl, ln)); kind, cur = None, []
        elif ln.startswith('>'):
            flush(); kind, cur = 'quote', [ln]
        elif ln.startswith('|'):
            flush(); kind, cur = 'table', []
        elif re.match(r'^(\s*[-*]\s|\s*\d+\.\s)', ln):
            if kind != 'list':
                flush(); kind, cur = 'list', []
            cur.append(ln)
        else:
            if kind in ('table', 'list'):
                flush(); kind, cur = None, []
            if ln.strip():
                if kind == 'para':
                    cur.append(ln)
                else:
                    flush(); kind, cur = 'para', [ln]
    flush()
    return out

def wc(t):
    t = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', t)
    t = re.sub(r'[#*`]', '', t)
    return len(t.split())

def report(path):
    raw = open(path, encoding='utf-8').read()
    e = raw.find('\n---', 3)
    body = raw[e + 4:] if e > 0 else ''
    us = units_of(body)
    chunks, h2 = [], None
    for kind, txt in us:
        if kind in ('h2', 'h3'):
            h2 = txt
            chunks.append(dict(h2=h2, head=txt, lvl=kind, para=[], lst=[], quote=False, table=False))
        else:
            c = chunks[-1] if chunks else dict(h2=None, head='(intro)', lvl='intro', para=[], lst=[], quote=False, table=False)
            if not chunks: chunks.append(c)
            if kind == 'para': c['para'].append(txt)
            elif kind == 'list': c['lst'].append(txt)
            elif kind == 'quote': c['quote'] = True
            elif kind == 'table': c['table'] = True
    print(f'== {path}')
    stats = []
    for c in chunks:
        p = wc(' '.join(c['para'])) if c['para'] else 0
        l = wc(' '.join(c['lst'])) if c['lst'] else 0
        if c['lvl'] == 'h2':
            continue  # h2 heading line itself opens a chunk with no prose yet? handled below
        stats.append(p)
    # recompute properly: chunks created at headings, prose follows
    stats, rows = [], []
    for c in chunks:
        p = wc(' '.join(c['para'])) if c['para'] else 0
        l = wc(' '.join(c['lst'])) if c['lst'] else 0
        rows.append((c['lvl'], c['head'], p, l, c['quote'], c['table']))
    for lvl, head, p, l, q, tb in rows:
        if lvl == 'h2':
            stats.append(p)
        flag = []
        if lvl != 'h2':
            if p < 120: flag.append('SHORT')
            if p > 180: flag.append('LONG')
        if lvl == 'h2' and not q: flag.append('NO-AEO')
        print(f"  [{lvl}] {head[:56]:56s} prose={p:3d} list={l:3d} aeo={'Y' if q else 'n'}{' ' + '/'.join(flag) if flag else ''}")
    sec = [s for s in stats if s > 0 or True]
    inb = sum(1 for s in stats if 120 <= s <= 180)
    allp = [s for _, _, s, _, _, _ in rows]
    inb_all = sum(1 for s in allp if 120 <= s <= 180)
    print(f"  CHUNKS={len(allp)} in-band={inb_all} short(<120)={sum(1 for s in allp if s<120)} long(>180)={sum(1 for s in allp if s>180)} | H2-prechunks in-band={inb}/{len(stats)}")
    return rows

if __name__ == '__main__':
    for f in sys.argv[1:]:
        report(f)
