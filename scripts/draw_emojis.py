import io
import os
from PIL import Image, ImageDraw, ImageFont

def create_emoji_image(emoji_char, filename):
    img = Image.new('RGBA', (200, 200), (255, 255, 255, 0))
    d = ImageDraw.Draw(img)
    try:
        # Try finding a font that supports emojis
        font = ImageFont.truetype("seguiemj.ttf", 100)
    except:
        font = ImageFont.load_default()
        
    d.text((50, 50), emoji_char, font=font, embedded_color=True)
    img.save(filename)

create_emoji_image("🕷️", "f:/projects/meuw_academy/assets/images/store/spiderman.png")
create_emoji_image("🎮", "f:/projects/meuw_academy/assets/images/store/console.png")
create_emoji_image("🧋", "f:/projects/meuw_academy/assets/images/store/milktea.png")
