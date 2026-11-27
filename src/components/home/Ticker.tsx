import { Fragment } from "react";

const items = [
  { label: "Salmão", red: false },
  { label: "Nigiri", red: true },
  { label: "Atum", red: false },
  { label: "Uramaki", red: true },
  { label: "Hot Roll", red: false },
  { label: "Temaki", red: true },
  { label: "Sashimi", red: false },
  { label: "Arte", red: true },
];

export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {[0, 1].map((pass) => (
          <Fragment key={pass}>
            {items.map((item) => (
              <Fragment key={item.label}>
                <span className={item.red ? "is-red" : undefined}>{item.label}</span>
                <i>·</i>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
