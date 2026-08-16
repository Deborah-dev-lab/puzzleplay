import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-fruit">🍒</span>
        <span>PuzzlePlay</span>
        <span className="logo-sparkle">✦</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/scores">🏆 Scores</Link>
      </div>

      <div className="nav-decoration">
        🍉 🎀
      </div>
    </nav>
  );
}

export default Navbar;