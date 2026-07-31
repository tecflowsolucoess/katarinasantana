import os
from PIL import Image, ImageEnhance

input_dir = r"c:\xampp\htdocs\midiakitdk\assets\raw"
output_dir = r"c:\xampp\htdocs\midiakitdk\assets\enhanced"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for file in os.listdir(input_dir):
    if file.lower().endswith((".jpg", ".jpeg", ".png")):
        path = os.path.join(input_dir, file)
        out_name = os.path.splitext(file)[0] + "_enhanced.png"
        out_path = os.path.join(output_dir, out_name)
        
        with Image.open(path) as img:
            img = img.convert("RGB")
            
            width, height = img.size
            if width < 1080:
                ratio = 1080 / width
                new_size = (1080, int(height * ratio))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Enhance sharpness
            enhancer = ImageEnhance.Sharpness(img)
            img = enhancer.enhance(1.3)
            
            # Enhance contrast slightly
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(1.05)
            
            img.save(out_path, "PNG", optimize=True)
            print(f"Enhanced {file} -> {out_name}")
