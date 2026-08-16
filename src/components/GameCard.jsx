import { Link } from "react-router-dom";

function GameCard({
  icon,
  title,
  description,
  path,
}) {
  return (
    <Link to={path} className="game-card">
      <div className="game-card-icon">{icon}</div>

      <h2>{title}</h2>

      <p>{description}</p>

      <span className="play-button">
        Play ✦
      </span>
    </Link>
  );
}

export default GameCard;