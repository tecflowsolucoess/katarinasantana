import os
from rembg import remove

image_dir = r"c:\xampp\htdocs\midiakitdk\assets\images"
images = ["1.png", "2.png", "3.png", "4.png"]

for img_name in images:
    input_path = os.path.join(image_dir, img_name)
    output_path = os.path.join(image_dir, "temp_" + img_name)
    
    print(f"Processing {input_path}...")
    try:
        with open(input_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
        
        # Replace the original with the transparent version
        os.replace(output_path, input_path)
        print(f"Successfully processed and replaced {input_path}")
    except Exception as e:
        print(f"Error processing {img_name}: {e}")
        
print("Done.")
