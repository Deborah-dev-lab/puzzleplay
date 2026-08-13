
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">
        <span className="logo-fruit">🍒</span>
        <span>PuzzlePlay</span>
        <span className="logo-sparkle">✦</span>
      </a>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/scores">🏆 Scores</a>
      </div>

      <div className="nav-decoration">
        🍉 🎀
      </div>
    </nav>
  );
}

export default Navbar;

