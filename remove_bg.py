import os
from rembg import remove

in1 = r"c:\xampp\htdocs\midiakitdk\assets\images\IMG_8070_enhanced.png"
out1 = r"c:\xampp\htdocs\midiakitdk\assets\images\IMG_8070_nobg.png"

in2 = r"c:\xampp\htdocs\midiakitdk\assets\images\D0CC3911_enhanced.png"
out2 = r"c:\xampp\htdocs\midiakitdk\assets\images\D0CC3911_nobg.png"

print("Removing background from image 1...")
with open(in1, 'rb') as i:
    with open(out1, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data)
        o.write(output_data)
print("Finished image 1")

print("Removing background from image 2...")
with open(in2, 'rb') as i:
    with open(out2, 'wb') as o:
        input_data = i.read()
        output_data = remove(input_data)
        o.write(output_data)
print("Finished image 2")
