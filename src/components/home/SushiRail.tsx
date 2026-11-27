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
  { img: "editorial-nigiri.webp", width: 717, height: 475, alt: "Nigiri de salmão", x: 2, start: 0.02, speed: 0.52, rot: -13, size: 300, z: 5, eager: true },
  { img: "editorial-platter.webp", width: 900, height: 883, alt: "Maki de salmão", x: 43, start: 0.22, speed: 0.82, rot: 11, size: 235, z: 4, eager: true },
  { img: "editorial-temaki.webp", width: 620, height: 850, alt: "Temaki de salmão", x: 9, start: 0.44, speed: 0.66, rot: -8, size: 265, z: 6, eager: true },
  { img: "editorial-gunkan.webp", width: 900, height: 883, alt: "Nigiri de atum", x: 47, start: 0.66, speed: 0.95, rot: 17, size: 225, z: 3 },
  { img: "editorial-sashimi.webp", width: 530, height: 285, alt: "Sashimi de salmão", x: -2, start: 0.86, speed: 0.45, rot: -5, size: 320, z: 7 },
  { img: "sushis.webp", width: 900, height: 900, alt: "Uramaki com tobiko", x: 38, start: -0.16, speed: 0.74, rot: -14, size: 210, z: 4 },
  { img: "menu-hot-roll.webp", width: 600, height: 600, alt: "Hot rolls", x: 6, start: 0.35, speed: 0.9, rot: 12, size: 250, z: 5 },
  { img: "nigiri.webp", width: 500, height: 500, alt: "Nigiri de camarão", x: 49, start: 0.54, speed: 0.61, rot: -18, size: 210, z: 4 },
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
            style={{ "--size": `${piece.size}px`, zIndex: piece.z } as CSSProperties}
          >
            <div className="sushi-piece__inner">
              <img
                src={`/images/${piece.img}`}
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

