import os
import re
from PIL import Image

dirs = [
    r"c:\xampp\htdocs\midiakitdk\assets\images",
    r"c:\xampp\htdocs\midiakitdk\assets\images\METRICAS"
]

# 1. Convert Images
print("Converting images to WebP...")
for d in dirs:
    for filename in os.listdir(d):
        if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
            if "og-image" in filename:
                continue # Keep OG image as jpg for compatibility
            path = os.path.join(d, filename)
            out_path = os.path.join(d, filename.rsplit(".", 1)[0] + ".webp")
            if not os.path.exists(out_path):
                print(f"Converting {filename} to .webp...")
                with Image.open(path) as img:
                    # Convert to RGB if RGBA (jpg doesn't have alpha, but webp does)
                    img.save(out_path, "webp", quality=80)

# 2. Update HTML
print("Updating index.html...")
html_path = r"c:\xampp\htdocs\midiakitdk\index.html"
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace image extensions in HTML
content = content.replace("assets/images/1.png", "assets/images/1.webp")
content = content.replace("assets/images/2.png", "assets/images/2.webp")
content = content.replace("assets/images/3.png", "assets/images/3.webp")
content = content.replace("assets/images/4.png", "assets/images/4.webp")
content = content.replace(".jpg", ".webp").replace(".jpeg", ".webp")
# Restore OG image back to jpg
content = content.replace("og-image.webp", "og-image.jpg")

# Add Preload for LCP (2.webp is the hero image)
if "rel=\"preload\" as=\"image\" href=\"assets/images/2.webp\"" not in content:
    content = content.replace(
        "<!-- CSS -->",
        "<!-- Preload LCP Image -->\n    <link rel=\"preload\" as=\"image\" href=\"assets/images/2.webp\">\n\n    <!-- CSS -->"
    )

# Defer scripts
content = content.replace("<script src=\"js/animations.js\"></script>", "<script src=\"js/animations.js\" defer></script>")
content = content.replace("<script src=\"js/main.js\"></script>", "<script src=\"js/main.js\" defer></script>")
content = content.replace("<script src=\"js/gallery.js\"></script>", "<script src=\"js/gallery.js\" defer></script>")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Performance optimizations applied.")
