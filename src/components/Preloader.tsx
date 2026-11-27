import styles from "./home/Preloader.module.css";
export default function Preloader() {
  return (
    <div className={`preloader ${styles.intro}`} id="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <div className="preloader__mark">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M7 12.8c5.8-1.7 12.1-2.5 17-2.5s11.2.8 17 2.5"
              stroke="currentColor"
              strokeWidth="3.1"
              strokeLinecap="round"
            />
            <path
              d="M10.4 18.7c4.6-.9 9.4-1.4 13.6-1.4s9 .5 13.6 1.4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M14.2 19.6 15.7 38M33.8 19.6 32.3 38"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M21.2 20.4v8.4M26.8 20.4v8.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity=".8"
            />
          </svg>
        </div>
        <div className="preloader__word">
          MTSUSHI <span>ARTE</span>
        </div>
        <div className="preloader__bar">
          <i />
        </div>
        <div className="preloader__note">preparando a arte…</div>
      </div>
    </div>
  );
}
