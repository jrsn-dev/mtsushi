import type { CSSProperties } from "react";

type Piece = {
  img: string;
  width: number;
  height: number;
  alt: string;
  x: number;
  start: number;
  speed: number;
  rot: number;
  size: number;
  z: number;
  eager?: boolean;
};

const pieces: Piece[] = [
  { img: "nigiri-salmon.webp", width: 717, height: 475, alt: "Nigiri de salmão", x: 28, start: 0.04, speed: 0.52, rot: -13, size: 300, z: 5, eager: true },
  { img: "maki-salmon.webp", width: 900, height: 883, alt: "Maki de salmão", x: 72, start: 0.19, speed: 0.82, rot: 11, size: 235, z: 4, eager: true },
  { img: "temaki-salmon.webp", width: 620, height: 850, alt: "Temaki de salmão", x: 43, start: 0.37, speed: 0.66, rot: -8, size: 265, z: 6, eager: true },
  { img: "nigiri-tuna.webp", width: 900, height: 883, alt: "Nigiri de atum", x: 78, start: 0.48, speed: 0.95, rot: 17, size: 225, z: 3 },
  { img: "sashimi-salmon.webp", width: 530, height: 285, alt: "Sashimi de salmão", x: 36, start: 0.69, speed: 0.45, rot: -5, size: 320, z: 7 },
  { img: "uramaki-tobiko.webp", width: 900, height: 900, alt: "Uramaki com tobiko", x: 62, start: 0.77, speed: 0.74, rot: -14, size: 210, z: 4 },
  { img: "hot-roll.webp", width: 600, height: 600, alt: "Hot rolls", x: 30, start: 0.91, speed: 0.9, rot: 12, size: 250, z: 5 },
  { img: "ebi-nigiri.webp", width: 500, height: 500, alt: "Nigiri de camarão", x: 71, start: 1.13, speed: 0.61, rot: -18, size: 210, z: 4 },
];

export default function SushiRail() {
  return (
    <aside className="sushi-rail" id="sushiRail" aria-hidden="true">
      <div className="sushi-stage" id="sushiStage">
        {pieces.map((piece) => (
          <div
            key={piece.img + piece.start}
            className="sushi-piece"
            data-x={piece.x}
            data-start={piece.start}
            data-speed={piece.speed}
            data-rot={piece.rot}
            style={{
              "--size": `${piece.size}px`,
              aspectRatio: `${piece.width} / ${piece.height}`,
              zIndex: piece.z,
              transform: `translate(min(calc(var(--rail-w) * ${piece.x / 100} - 50%), calc(var(--rail-w) - ${(1 + Math.abs(Math.cos(piece.rot * Math.PI / 180)) + Math.abs(Math.sin(piece.rot * Math.PI / 180)) * piece.height / piece.width) * 50}% - 6px)), calc(${piece.start * 100}vh - 50%)) rotate(${piece.rot}deg)`,
            } as CSSProperties}
          >
            <div className="sushi-piece__inner">
              <img
                src={`/assets/img/${piece.img}`}
                width={piece.width}
                height={piece.height}
                alt=""
                loading={piece.eager ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="petals" id="petals" />
    </aside>
  );
}
