import os
import re

blog_dir = "/Users/alib/webabc-ir/src/content/blog"
public_dir = "/Users/alib/webabc-ir/public"

langs = ["en", "fa", "ar"]
missing_count = 0
checked_count = 0

all_posts = {}

for lang in langs:
    lang_path = os.path.join(blog_dir, lang)
    if not os.path.exists(lang_path):
        continue
    for f in sorted(os.listdir(lang_path)):
        if f.endswith(".md") or f.endswith(".mdx"):
            checked_count += 1
            file_path = os.path.join(lang_path, f)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
            match = re.search(r'image:\s*["\']?([^"\'''' + '\n' + r']+)["\']?', content)
            if match:
                img_url = match.group(1).strip().strip('"').strip("'")
                rel_img = img_url.lstrip("/")
                full_img_path = os.path.join(public_dir, rel_img)
                exists = os.path.exists(full_img_path)
                all_posts[(lang, f)] = (img_url, exists)
                if not exists:
                    missing_count += 1
                    print(f"❌ [MISSING IMAGE] [{lang}] {f}: image: \"{img_url}\"")
            else:
                print(f"⚠️ [NO IMAGE FRONTMATTER] [{lang}] {f}")

print(f"\nAudit completed: {checked_count} posts checked, {missing_count} missing images found.")
