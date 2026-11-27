export default function Preloader() {
  return (
    <div className="preloader" id="preloader" aria-hidden="true">
      <div className="preloader__inner">
        <img src="/images/mt-sushi-logo.svg" alt="MT Sushi Arte" width={150} height={42} />
        <div className="preloader__bar">
          <i />
        </div>
        <div className="preloader__note">preparando a arte…</div>
      </div>
    </div>
  );
}
