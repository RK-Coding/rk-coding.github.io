from PIL import Image

def clamp(x): 
  return max(0, min(x, 255))

image_url = input("image url: ")

im = Image.open(image_url) 
width = im.size[0]
height = im.size[1]
pixel_obj = im.load()
pixels = []

for x in range(width):
    for y in range(height):
        pixels.append("#{0:02x}{1:02x}{2:02x}".format(clamp(pixel_obj[x, y][0]), clamp(pixel_obj[x, y][1]), clamp(pixel_obj[x, y][2])))

print("pixels:", pixels, "width:", width, "height:", height)
input()

