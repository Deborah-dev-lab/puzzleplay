import GameCard from "../components/GameCard";

function Home() {
  return (
    <main className="home-page">

      <section className="hero">
        <p className="hero-label">
          🍒 PUZZLEPLAY • GIRLIE BRAIN GAMES 🍒
        </p>

        <h1>
          Let's Get
          <br />
          <span>Brainy!</span> ♡
        </h1>

        <p className="hero-description">
          Cute games, clever challenges and a little
          bit of girl power. Pick a game and show
          off your puzzle skills!
        </p>
      </section>

      <section className="games-section">
        <div className="section-heading">
          <p>CHOOSE YOUR CHALLENGE ✦</p>
          <h2>What are we playing?</h2>
        </div>

        <div className="games-grid">

          <GameCard
            icon="📝"
            title="Crossword"
            description="Test your knowledge with clues inspired by girl pop, girl dinner and girl core."
            path="/crossword"
          />

          <GameCard
            icon="🔢"
            title="Sudoku"
            description="Fill the grid, use your brain and become the ultimate Sudoku queen."
            path="/sudoku"
          />

          <GameCard
            icon="🔎"
            title="Word Search"
            description="Find hidden words across fun and colourful PuzzlePlay themes."
            path="/wordsearch"
          />

        </div>
      </section>

      <section className="home-bottom">
        <span>🍓</span>
        <p>Smart girls love puzzles.</p>
        <span>🍒</span>
      </section>

    </main>
  );
}

export default Home;