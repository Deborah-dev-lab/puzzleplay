import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .order("score", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Error fetching scores:", error);
      setError("Could not load scores.");
    } else {
      setScores(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="scores-page">
      <section className="scores-hero">
        <p className="eyebrow">🏆 PuzzlePlay leaderboard</p>

        <h1>Top Scores ✦</h1>

        <p>
          See who is currently ruling the PuzzlePlay leaderboard.
        </p>
      </section>

      <section className="scores-board">
        {loading && <p className="scores-status">Loading scores...</p>}

        {error && <p className="scores-status">{error}</p>}

        {!loading && !error && scores.length === 0 && (
          <div className="empty-scores">
            <span>🍒</span>
            <h2>No scores yet!</h2>
            <p>Play a game and become the first PuzzlePlay champion.</p>
          </div>
        )}

        {!loading && !error && scores.length > 0 && (
          <div className="score-list">
            {scores.map((score, index) => (
              <div className="score-row" key={score.id}>
                <div className="score-rank">
                  {index === 0 && "🥇"}
                  {index === 1 && "🥈"}
                  {index === 2 && "🥉"}
                  {index > 2 && `#${index + 1}`}
                </div>

                <div className="score-player">
                  <strong>{score.player_name}</strong>
                  <span>{score.game}</span>
                </div>

                <div className="score-value">
                  {score.score}
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="refresh-scores" onClick={fetchScores}>
          Refresh Scores ↻
        </button>
      </section>
    </main>
  );
}

export default Scores;