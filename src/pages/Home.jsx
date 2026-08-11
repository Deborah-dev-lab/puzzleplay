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

          <GameCard
            title="Crossword"
            description="Grab your pencil and solve those clues!"
            icon="📝"
            link="/crossword"
          />

          <GameCard
            title="Sudoku"
            description="Put your thinking cap on and slay the numbers!"
            icon="🔢"
            link="/sudoku"
          />

          <GameCard
            title="Word Search"
            description="Find the hidden words before they disappear!"
            icon="🔎"
            link="/wordsearch"
          />

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