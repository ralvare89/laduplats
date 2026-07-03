import os
from pathlib import Path
from rembg import remove
from PIL import Image

slider_dir = Path(r"C:\Users\romy.fernandez\Desktop\Romy Personal\LaDuplaT&S\public\images\slider")
out_dir = slider_dir / "nobg"
out_dir.mkdir(exist_ok=True)

images = [f for f in slider_dir.glob("*.jpg") if not f.stem.startswith("flag_")]
print(f"Procesando {len(images)} imágenes...\n")

for img_path in sorted(images):
    print(f"  {img_path.name}...", end=" ", flush=True)
    with open(img_path, "rb") as f:
        data = remove(f.read())
    out_path = out_dir / (img_path.stem + ".png")
    with open(out_path, "wb") as f:
        f.write(data)
    size_kb = out_path.stat().st_size // 1024
    print(f"OK ({size_kb}KB)")

print(f"\nListo - imagenes en: {out_dir}")
