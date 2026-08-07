import os
import re

blog_dir = "/Users/alib/webabc-ir/src/content/blog"

corrections = {
    ("en", "how-to-write-clickable-headlines.mdx"): "/images/blog/clickable-headlines.webp",
    ("en", "website-development-costs.mdx"): "/images/blog/development-costs.webp",
    ("fa", "best-seo-tools-2025.mdx"): "/images/blog/best-seo-tools.webp",
    ("fa", "how-to-write-clickable-headlines.mdx"): "/images/blog/clickable-headlines.webp",
    ("fa", "local-seo-middle-east.mdx"): "/images/blog/local-seo.webp",
    ("fa", "modern-ui-ux-trends.mdx"): "/images/blog/ui-ux-trends.webp",
    ("fa", "website-development-costs.mdx"): "/images/blog/development-costs.webp",
    ("ar", "best-seo-tools-2025.mdx"): "/images/blog/best-seo-tools.webp",
    ("ar", "how-to-write-clickable-headlines.mdx"): "/images/blog/clickable-headlines.webp",
    ("ar", "local-seo-middle-east.mdx"): "/images/blog/local-seo.webp",
    ("ar", "modern-ui-ux-trends.mdx"): "/images/blog/ui-ux-trends.webp",
    ("ar", "website-development-costs.mdx"): "/images/blog/development-costs.webp"
}

for (lang, filename), new_img in corrections.items():
    file_path = os.path.join(blog_dir, lang, filename)
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Replace broken image line
        new_content = re.sub(r'image:\s*["\']?([^"\'''' + '\n' + r']+)["\']?', f'image: "{new_img}"', content, count=1)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Fixed {lang}/{filename} -> {new_img}")
