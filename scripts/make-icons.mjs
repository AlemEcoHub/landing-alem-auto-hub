// Готовит из исходного логотипа весь набор иконок сайта.
//
//   npm run icons -- public/logo-source.png
//
// Из квадратного логотипа берётся верхняя часть — знак «A», он ложится в
// иконку со скруглёнными углами. Полный локап целиком идёт в og-картинку.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";

const src = process.argv[2] ?? "public/logo-source.png";
if (!existsSync(src)) {
  console.error(`Не найден файл ${src}`);
  console.error("Сохраните логотип в public/logo-source.png и запустите снова.");
  process.exit(1);
}

const py = `
import sys
from PIL import Image, ImageChops, ImageDraw

src = sys.argv[1]
img = Image.open(src).convert("RGBA")
w, h = img.size

# Знак «A» занимает верхнюю часть квадратного логотипа. Берём его с запасом и
# обрезаем по фактическим светлым пикселям, чтобы знак сел ровно.
mark = img.crop((0, int(h * 0.12), w, int(h * 0.60)))

# Логотип отрисован на чёрном фоне. Альфу берём как max(R,G,B): для картинки,
# сведённой на чёрный, это точная маска — цвета не выцветают, края остаются
# сглаженными, а вырезы внутри «A» (контур машины, внутренний треугольник)
# остаются вырезами.
gray = mark.convert("L")
r, g, b = mark.split()[:3]
mark.putalpha(ImageChops.lighter(ImageChops.lighter(r, g), b))

bbox = gray.point(lambda v: 255 if v > 24 else 0).getbbox()
if bbox:
    pad = int(max(mark.size) * 0.06)
    left = max(bbox[0] - pad, 0)
    top = max(bbox[1] - pad, 0)
    right = min(bbox[2] + pad, mark.size[0])
    bottom = min(bbox[3] + pad, mark.size[1])
    mark = mark.crop((left, top, right, bottom))

# Кладём знак в квадрат с полями и скруглёнными углами.
def rounded(size, inset=0.16, radius_ratio=0.22, bg=(0, 0, 0, 255)):
    canvas = Image.new("RGBA", (size, size), bg)
    box = int(size * (1 - inset * 2))
    m = mark.copy()
    m.thumbnail((box, box), Image.LANCZOS)
    canvas.paste(m, ((size - m.size[0]) // 2, (size - m.size[1]) // 2), m)

    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255
    )
    out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out.paste(canvas, (0, 0), mask)
    return out

rounded(512).save("public/icon-512.png", optimize=True)
rounded(192).save("public/icon-192.png", optimize=True)
rounded(180, radius_ratio=0.0).save("public/apple-icon.png", optimize=True)
rounded(64).save("public/icon.png", optimize=True)

# favicon.ico с несколькими размерами внутри
rounded(64).save(
    "public/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
)

# Прозрачный знак для шапки сайта
head = mark.copy()
head.thumbnail((256, 256), Image.LANCZOS)
head.save("public/logo-mark.png", optimize=True)

print("готово:", ", ".join([
    "favicon.ico", "icon.png", "icon-192.png", "icon-512.png",
    "apple-icon.png", "logo-mark.png",
]))
`;

mkdirSync("public", { recursive: true });
execFileSync("python3", ["-c", py, src], { stdio: "inherit" });
