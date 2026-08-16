import { useState } from "react";
import crosswordCategories from "./crosswordData";
import { supabase } from "../../lib/supabaseClient";

function Crossword() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (!selectedCategory) {
    return (
      <main className="crossword-page">
        <section className="crossword-header">
          <p className="game-label">
            PUZZLEPLAY • CROSSWORD
          </p>

          <h1>
            Crossword <span>♡</span>
          </h1>

          <p>
            Pick a theme and solve the clues!
          </p>
        </section>

        <section className="crossword-category-grid">
          {crosswordCategories.map((category) => (
            <button
              key={category.id}
              className="crossword-category-card"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="crossword-category-icon">
                {category.icon}
              </div>

              <h2>{category.title}</h2>

              <p>{category.description}</p>

              <span>Play ✦</span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  return (
    <CrosswordPuzzle
      category={selectedCategory}
      onBack={() => setSelectedCategory(null)}
    />
  );
}

function CrosswordPuzzle({ category, onBack }) {
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");

  const [playerName, setPlayerName] = useState("");

  const [score, setScore] = useState(null);

  const [scoreSaved, setScoreSaved] = useState(false);

  const [savingScore, setSavingScore] = useState(false);

  const handleChange = (index, value) => {
    const cleanValue = value
      .toUpperCase()
      .replace(/[^A-Z]/g, "");

    setAnswers((previous) => ({
      ...previous,
      [index]: cleanValue,
    }));

    setMessage("");
  };

  const checkAnswers = () => {
    let correct = 0;

    category.words.forEach((word, index) => {
      if (answers[index] === word.answer) {
        correct++;
      }
    });

    const total = category.words.length;

    const calculatedScore = correct * 10;

    setScore(calculatedScore);

    if (correct === total) {
      setMessage(
        `Perfect! You solved them all! 👑🎀 Score: ${calculatedScore}`
      );
    } else {
      setMessage(
        `${correct}/${total} correct. Your current score is ${calculatedScore} points. Keep going! 💕`
      );
    }
  };

  const saveScore = async () => {
    if (!playerName.trim()) {
      setMessage("Please enter your name before saving your score. 🎀");
      return;
    }

    if (score === null) {
      setMessage("Check your answers first! ✦");
      return;
    }

    if (scoreSaved) {
      setMessage("Your score has already been saved! 🏆");
      return;
    }

    setSavingScore(true);

    const { error } = await supabase
      .from("scores")
      .insert([
        {
          player_name: playerName.trim(),
          game: `Crossword - ${category.title}`,
          score: score,
        },
      ]);

    setSavingScore(false);

    if (error) {
      console.error("Error saving score:", error);

      setMessage(
        "Could not save your score. Please try again."
      );

      return;
    }

    setScoreSaved(true);

    setMessage(
      "Score saved successfully! 🏆 Check the leaderboard!"
    );
  };

  const resetPuzzle = () => {
    setAnswers({});
    setMessage("");
    setScore(null);
    setScoreSaved(false);
    setPlayerName("");
  };

  return (
    <main className="crossword-page">
      <section className="crossword-header">
        <button
          className="back-button"
          onClick={onBack}
        >
          ← Categories
        </button>

        <p className="game-label">
          {category.icon} PUZZLEPLAY •{" "}
          {category.title.toUpperCase()}
        </p>

        <h1>
          {category.title} Crossword <span>♡</span>
        </h1>

        <p>
          Read each clue and type your answer.
        </p>
      </section>

      <section className="crossword-puzzle">

        {category.words.map((word, index) => (
          <div
            className="clue-card"
            key={word.answer}
          >
            <span className="clue-number">
              {index + 1}
            </span>

            <div className="clue-content">
              <p>{word.clue}</p>

              <input
                type="text"
                value={answers[index] || ""}
                onChange={(event) =>
                  handleChange(
                    index,
                    event.target.value
                  )
                }
                placeholder="Your answer..."
              />
            </div>
          </div>
        ))}

        <div className="crossword-actions">

          <button
            className="check-button"
            onClick={checkAnswers}
          >
            Check Answers ✦
          </button>

          <button
            className="new-puzzle-button"
            onClick={resetPuzzle}
          >
            Reset
          </button>

        </div>

        {message && (
          <p className="crossword-message">
            {message}
          </p>
        )}

        {score !== null && (
          <section className="score-save-box">

            <h2>
              Your Score: {score} 🏆
            </h2>

            <p>
              Enter your name to save your score to
              the PuzzlePlay leaderboard.
            </p>

            <input
              type="text"
              value={playerName}
              onChange={(event) =>
                setPlayerName(event.target.value)
              }
              placeholder="Enter your name"
              maxLength={30}
            />

            <button
              className="check-button"
              onClick={saveScore}
              disabled={savingScore || scoreSaved}
            >
              {savingScore
                ? "Saving..."
                : scoreSaved
                ? "Score Saved ✓"
                : "Save Score 🏆"}
            </button>

          </section>
        )}

      </section>
    </main>
  );
}

export default Crossword;