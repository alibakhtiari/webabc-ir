import re,sys,io

def parse(f):
    raw=open(f,encoding='utf-8').read()
    e=raw.find('\n---',3); fm=raw[:e]; b=raw[e+4:] if e>0 else ''
    t=re.search(r"^title:\s*(.+)$",fm,re.M)
    d=re.search(r"^description:\s*(.+)$",fm,re.M)
    t=t.group(1).strip().strip("'\"") if t else ''
    d=d.group(1).strip().strip("'\"") if d else ''
    body=re.sub(r'```.*?```','',b,flags=re.S); body=re.sub(r'<[^>]+>','',body)
    body=re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',body); body=re.sub(r'[#*`\-]>','',body)
    w=len(body.split())
    # headings (outside fences)
    nofence=re.sub(r'```.*?```','',b,flags=re.S)
    h2=re.findall(r'^(## .+)$',nofence,re.M)
    h3=re.findall(r'^(### .+)$',nofence,re.M)
    # openers: first prose paragraph after each H2 (skip tables/lists/fences), stop before ###
    parts=re.split(r'^(## .+)$',nofence,flags=re.M)
    openers=[]
    for i in range(1,len(parts),2):
        c=parts[i+1]
        c=re.split(r'^### ',c,flags=re.M)[0]
        c=re.sub(r'```.*?```','',c,flags=re.S)
        paras=[p.strip() for p in c.split('\n\n') if p.strip() and not p.strip().startswith('|') and not p.strip().startswith('-') and not p.strip().startswith('*') and not p.strip().startswith('1.')]
        op=paras[0] if paras else ''
        op=re.sub(r'\[([^\]]*)\]\([^)]*\)',r'\1',op)
        op=re.sub(r'[#*`]','',op)
        openers.append(len(op.split()))
    kt=len(re.findall(r'^\s{2}- ',fm,re.M)) if 'keyTakeaways' in fm else 0
    # faq count: count '  - question:' lines
    faq=len(re.findall(r'^\s*- question:',fm,re.M))
    links=re.findall(r'\]\((/[^)]*)\)',b)
    bad=[]
    if w<1500: bad.append(f'{w}w<1500')
    if len(t)>60: bad.append(f'title {len(t)}ch>60')
    if not (150<=len(d)<=160): bad.append(f'desc {len(d)}ch')
    if not re.search(r'^updatedDate:\s*2026-09-23',fm,re.M): bad.append('updatedDate bad')
    if 'keyTakeaways:' not in fm: bad.append('kt MISSING')
    if re.search(r'^faq:',fm,re.M) is None: bad.append('faq MISSING')
    if re.search(r'^image:',fm,re.M) is None: bad.append('image MISSING')
    if re.search(r'^category:',fm,re.M) is None: bad.append('category MISSING')
    if re.search(r'^date:',fm,re.M) is None: bad.append('date MISSING')
    if re.search(r'^# ',nofence,re.M): bad.append('stray H1')
    for o in openers:
        if not (40<=o<=60): bad.append(f'opener {o}w')
    return dict(w=w,t=len(t),d=len(d),h2=h2,h3=len(h3),kt=kt,faq=faq,links=links,openers=openers,bad=bad,readTime=max(1,round(w/200)))

if __name__=='__main__':
    for f in sys.argv[1:]:
        r=parse(f)
        print(f"== {f}")
        print(f"  words={r['w']} title={r['t']} desc={r['d']} readTime={r['readTime']} H2={len(r['h2'])} H3={r['h3']} kt={r['kt']} faq={r['faq']} links={len(r['links'])}")
        print(f"  openers={r['openers']}")
        if r['bad']: print(f"  BAD: {r['bad']}")
        else: print("  OK")
