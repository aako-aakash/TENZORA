import logo from "../assets/Tenzora_logo.png";

function Header({ soundOn, setSoundOn }) {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="Tenzora logo" className="app-logo" />
        <span className="brand">TENZORA</span>
      </div>

      <button
        className="sound-toggle"
        onClick={() => setSoundOn(prev => !prev)}
        aria-label={soundOn ? "Mute sound" : "Unmute sound"}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>
    </header>
  );
}

export default Header;
