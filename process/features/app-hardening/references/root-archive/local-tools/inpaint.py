import cv2
import numpy as np
import os

print("Starting inpainting...")
# Load image with red boxes
marked_path = r"C:\Users\vumin\.gemini\antigravity\brain\d9fddfa1-6132-43f3-89c8-3fcac12ea2f5\media__1780722214183.jpg"
clean_path = r"assets\images\collection_cover.jpg"

marked = cv2.imread(marked_path)
clean = cv2.imread(clean_path)

if marked is None or clean is None:
    print("Could not load images")
    exit(1)

# Find red pixels. Red in BGR is (0, 0, 255)
# Using a range to catch typical annotation red
lower_red1 = np.array([0, 0, 150])
upper_red1 = np.array([50, 50, 255])
# sometimes red can have slightly higher B or G due to compression, let's just use simple threshold
b, g, r = cv2.split(marked)
# Condition for red: R > 150, G < 80, B < 80
red_mask = ((r > 150) & (g < 80) & (b < 80)).astype(np.uint8) * 255

# Find contours of the red boxes
contours, _ = cv2.findContours(red_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

inpaint_mask = np.zeros(clean.shape[:2], dtype=np.uint8)

print(f"Found {len(contours)} contours")

# For each contour, draw a filled rectangle on the inpaint_mask
for c in contours:
    x, y, w, h = cv2.boundingRect(c)
    # Ignore tiny noise
    if w < 10 or h < 10:
        continue
    print(f"Box at x:{x}, y:{y}, w:{w}, h:{h}")
    
    # Expand slightly
    pad = 5
    x1 = max(0, x - pad)
    y1 = max(0, y - pad)
    x2 = min(clean.shape[1], x + w + pad)
    y2 = min(clean.shape[0], y + h + pad)
    
    cv2.rectangle(inpaint_mask, (x1, y1), (x2, y2), 255, -1)

# Inpaint
result = cv2.inpaint(clean, inpaint_mask, 5, cv2.INPAINT_TELEA)

cv2.imwrite(clean_path, result)
print("Inpainting complete and saved!")
