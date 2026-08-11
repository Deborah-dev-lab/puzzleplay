function GameCard({ title, description, icon, link }) {
  return (
    <div className="game-card">

      <div className="card-sticker">
        {icon}
      </div>

      <div className="card-content">

        <p className="card-label">
          ♡ PUZZLE TIME ♡
        </p>

        <h2>{title}</h2>

        <p className="card-description">
          {description}
        </p>

        <a href={link} className="play-button">
          Play Now ✦
        </a>

      </div>

      <div className="card-decoration">
        ♡
      </div>

    </div>
  );
}

export default GameCard;