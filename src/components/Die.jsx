function Die({ value, isHeld, onClick, isRolling, hasWon }) {
  return (
    <button
      className={`die
        ${isHeld ? "die--held" : ""}
        ${isRolling && !isHeld ? "die--rolling" : ""}
        ${hasWon ? "die--win" : ""}
      `}
      onClick={onClick}
      aria-pressed={isHeld}
      aria-label={`Die showing ${value}, ${isHeld ? "held" : "not held"}`}
    >
      <span className="die-value">{value}</span>
    </button>
  );
}

export default Die;
