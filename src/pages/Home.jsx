import GameCard from "../components/GameCard";
function Home() {
  return (
    <main className="home">

      <section className="hero">
        <div className="hero-badge">
          🍒 WELCOME TO PUZZLEPLAY 🍒
        </div>

        <h1>
          Let's Get <span>Brainy!</span> ♡
        </h1>

        <p>
          Cute games, big brains and a little bit of sparkle.
        </p>

        <div className="hero-fruits">
          🍒 🍉 🍓 🎀 🍓 🍉 🍒
        </div>
      </section>

      <section className="games-section">

        <div className="section-heading">
          <span>✦</span>
          <h2>Pick Your Puzzle</h2>
          <span>✦</span>
        </div>

        <p className="section-subtitle">
          Which puzzle girl are you today?
        </p>

        <div className="games">

          <div className="game-card">
            <div className="card-sticker">📝</div>
            <h2>Crossword</h2>
            <p>Solve the clues and show off your brain!</p>
            <a href="/crossword" className="play-button">
              Play Now ✦
            </a>
          </div>

          <div className="game-card">
            <div className="card-sticker">🔢</div>
            <h2>Sudoku</h2>
            <p>Put your thinking cap on and slay the numbers!</p>
            <a href="/sudoku" className="play-button">
              Play Now ✦
            </a>
          </div>

          <div className="game-card">
            <div className="card-sticker">🔎</div>
            <h2>Word Search</h2>
            <p>Find the hidden words before they disappear!</p>
            <a href="/wordsearch" className="play-button">
              Play Now ✦
            </a>
          </div>

        </div>

      </section>

      <section className="bottom-message">
        <div className="bow">🎀</div>

        <h2>
          Smart girls <span>love puzzles.</span>
        </h2>

        <p>
          Take your time, have fun and don't forget to check
          the leaderboard!
        </p>

        <div className="bottom-fruits">
          🍒 💕 🍉 💕 🍒
        </div>
      </section>

    </main>
  );
}

export default Home;