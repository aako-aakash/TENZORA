import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import clickSound from "../assets/sounds/click.mp3";
import winSound from "../assets/sounds/win.mp3";
import Confetti from "react-confetti";


function MainPage({ soundOn, isTabActive }) {
  const [dice, setDice] = useState(generateAllNewDice());
  const [hasWon, setHasWon] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [isRolling, setIsRolling] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasRolledOnce, setHasRolledOnce] = useState(false);
  const clickAudio = useRef(new Audio(clickSound));
  const winAudio = useRef(new Audio(winSound));
  const diceRef = useRef(null);
  const [rollCount, setRollCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isTiming, setIsTiming] = useState(false);


  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    // start timer on first roll
    if (!isTiming && !hasWon) {
      setIsTiming(true);
    }

    // increment roll count
    if (!hasWon) {
      setRollCount(prev => prev + 1);
    }
    //auto-collapse rules + scroll on first roll
    if (!hasRolledOnce) {
      setShowRules(false);
      setHasRolledOnce(true);

      // smooth scroll to dice
      setTimeout(() => {
        diceRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 250); // wait for collapse animation
    }

    if (!hasWon) {
      if (soundOn && isTabActive) {
        clickAudio.current.currentTime = 0;
        clickAudio.current.play();
      }

      setIsRolling(true);

      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );

      setTimeout(() => {
        setIsRolling(false);
      }, 200);
    } else {
      setHasWon(false);
      setDice(generateAllNewDice());
      setHasRolledOnce(false);
      setShowRules(true); // optional: reopen rules for new game
    }
  }


  function holdDie(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setHasWon(true);
      setIsTiming(false);
    }
    if (allHeld && allSameValue) {
      setHasWon(true);
      setShowConfetti(true);

      // auto-remove confetti
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  }, [dice]);

  useEffect(() => {
    if (hasWon && soundOn && isTabActive) {
      winAudio.currentTime = 0;
      winAudio.current.play();
    }
  }, [hasWon, soundOn, isTabActive]);

  useEffect(() => {
    if (!isTiming) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTiming]);
  
  useEffect(() => {
    clickAudio.current.muted = !soundOn;
    winAudio.current.muted = !soundOn;
  }, [soundOn]);

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      isRolling={isRolling}
      hasWon={hasWon}
      onClick={() => holdDie(die.id)}
    />
  ));

  return (
    <main className="main" aria-describedby="sr-instructions">
      {showConfetti && (
        <Confetti
          aria-hidden="true"
          recycle={false}
          numberOfPieces={300}
          gravity={0.23}
          wind={0.01}
        />

      )}


      <p
        id="sr-instructions"
        className="sr-only"
      >
        Welcome to the Tenzies game. Use the Tab key to navigate between dice.
        Press Enter or Space to hold a die. Press the Roll button to roll
        unheld dice. The goal is to hold all dice with the same number.
      </p>

      {/* ===== GAME INFO CARD ===== */}
      <section className="game-card"   aria-labelledby="game-title">
        <h2 className="game-card-title">Tenzies</h2>

        <p className="game-card-text">
          Match all ten dice to the same number to win.
        </p>

        <button
          className="rules-toggle"
          aria-describedby="rules-help"
          onClick={() => setShowRules(prev => !prev)}
          aria-expanded={showRules}
          aria-controls="rules-content"
        >
          {showRules ? "Hide rules" : "How to play"}
        </button>
        <span id="rules-help" className="sr-only">
          Expands instructions for how to play the game
        </span>

        <div id="rules-content" className={`rules-content ${showRules ? "open" : ""}`}>
          <p>
            Roll the dice to generate new values. Click on a die to hold its
            value between rolls.
          </p>
          <p>
            Continue rolling until all dice are held and show the same number.
          </p>
        </div>
      </section>

      <div className="game-stats">
        <div>
          <span className="stat-label">Rolls</span>
          <span className="stat-value">{rollCount}</span>
        </div>
        <div>
          <span className="stat-label">Time</span>
          <span className="stat-value">{time}s</span>
        </div>
      </div>

      {/* ===== GAME AREA ===== */}
      <div className="game-area">
        <div className="dice-container" ref={diceRef}>
          {diceElements}
        </div>
        {hasWon && (
          <p className="win-message" 
            role="status"
            aria-live="polite"
          >
            🎉 You won! All dice are aligned.
          </p>
        )}

        <button className="roll-dice" onClick={rollDice}>
          {hasWon ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default MainPage;
