import os
import re

blog_dir = "/Users/alib/webabc-ir/src/content/blog"

mapping = {
    "سئو": "SEO",
    "سيو": "SEO",
    "طراحی وب": "Web Design",
    "تصميم الويب": "Web Design",
    "توسعه وب": "Web Development",
    "تطوير الويب": "Web Development",
    "بازاریابی دیجیتال": "Digital Marketing",
    "دیجیتال مارکتینگ": "Digital Marketing",
    "التسويق الرقمي": "Digital Marketing",
}

count = 0
for root, dirs, files in os.walk(blog_dir):
    for f in files:
        if f.endswith(".mdx") or f.endswith(".md"):
            file_path = os.path.join(root, f)
            with open(file_path, "r", encoding="utf-8") as file:
                content = file.read()
            match = re.search(r'category:\s*["\']?([^"\'''' + '\n' + r']+)["\']?', content)
            if match:
                cat_val = match.group(1).strip().strip('"').strip("'")
                if cat_val in mapping:
                    new_cat = mapping[cat_val]
                    new_content = re.sub(r'category:\s*["\']?([^"\'''' + '\n' + r']+)["\']?', f'category: "{new_cat}"', content, count=1)
                    with open(file_path, "w", encoding="utf-8") as file:
                        file.write(new_content)
                    count += 1
                    print(f"Updated {file_path}: {cat_val} -> {new_cat}")

print(f"Standardized {count} blog post category frontmatters.")
