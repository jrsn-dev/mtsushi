// Convert the existing local food photography into transparent PNG cutouts.
// Runs before Next.js dev/build so /cardapio always serves actual PNG assets.
import { mkdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const output = join(root, "menu-cutouts");
const names = [
  "editorial-sashimi", "editorial-macro", "editorial-hero", "sushis",
  "menu-hot-roll", "editorial-temaki", "editorial-platter",
  "editorial-nigiri", "menu-sobremesa", "menu-sunomono",
  "menu-ceviche", "editorial-chopsticks", "editorial-grilled",
];
await mkdir(output, { recursive: true });

for (const name of names) {
  const input = join(root, name + ".webp");
  const target = join(output, name + ".png");
  const [sourceStats, outputStats] = await Promise.all([stat(input), stat(target).catch(() => null)]);
  if (outputStats && outputStats.mtimeMs >= sourceStats.mtimeMs) continue;

  const { data, info } = await sharp(input)
    .resize({ width: 500, withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = Buffer.alloc(width * height * 4);

  // Dark-background keying plus a feathered outer contour. There is no
  // checkerboard or baked-in card background in these PNG files.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = y * width + x;
      const source = index * channels;
      const red = data[source], green = data[source + 1], blue = data[source + 2];
      const max = Math.max(red, green, blue);
      const min = Math.min(red, green, blue);
      const chroma = max - min;
      const brightness = max;
      const darkAlpha = Math.max(0, Math.min(1, (brightness - 19) / 70 + chroma / 185));
      const border = Math.min(x, y, width - 1 - x, height - 1 - y);
      const borderAlpha = Math.max(0, Math.min(1, border / Math.max(12, Math.min(width, height) * .075)));
      const alpha = Math.round(255 * darkAlpha * borderAlpha);
      const dest = index * 4;
      pixels[dest] = red;
      pixels[dest + 1] = green;
      pixels[dest + 2] = blue;
      pixels[dest + 3] = alpha;
    }
  }

  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9, effort: 7 })
    .toFile(target);
}
console.log("Cardápio: imagens PNG transparentes prontas.");
