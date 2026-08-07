import os
import re

blog_dir = "/Users/alib/webabc-ir/src/content/blog"
categories = set()

for root, dirs, files in os.walk(blog_dir):
    for f in files:
        if f.endswith(".mdx") or f.endswith(".md"):
            with open(os.path.join(root, f), "r", encoding="utf-8") as file:
                content = file.read()
            match = re.search(r'category:\s*["\']?([^"\'''' + '\n' + r']+)["\']?', content)
            if match:
                categories.add(match.group(1).strip().strip('"').strip("'"))

print("Unique categories across all MDX files:")
for cat in sorted(categories):
    print(f'- "{cat}"')
