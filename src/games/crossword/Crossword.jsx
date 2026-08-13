import { useState } from "react";
import crosswordCategories from "./crosswordData";

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
            Pick your favourite theme and let's get puzzling!
          </p>
        </section>

        <section className="category-grid">
          {crosswordCategories.map((category) => (
            <button
              key={category.id}
              className="category-card"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h2>{category.title}</h2>

              <p>{category.description}</p>

              <span className="category-play">
                Play ✦
              </span>
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
    const allCorrect = category.words.every(
      (word, index) =>
        answers[index] === word.answer
    );

    if (allCorrect) {
      setMessage(
        "You got them all! You're a puzzle queen! 🎀"
      );
    } else {
      setMessage(
        "Not quite! Keep going, girlie! 💕"
      );
    }
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
          Solve the clues below!
        </p>
      </section>

      <section className="clue-list">
        {category.words.map((word, index) => (
          <div
            className="clue-card"
            key={word.answer}
          >
            <div className="clue-number">
              {index + 1}
            </div>

            <div className="clue-content">
              <p>{word.clue}</p>

              <input
                type="text"
                value={answers[index] || ""}
                maxLength={word.answer.length}
                onChange={(event) =>
                  handleChange(
                    index,
                    event.target.value
                  )
                }
                placeholder={"_".repeat(
                  word.answer.length
                )}
              />
            </div>
          </div>
        ))}
      </section>

      <div className="crossword-actions">
        <button
          className="check-button"
          onClick={checkAnswers}
        >
          Check Answers ✦
        </button>

        {message && (
          <p className="crossword-message">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}

export default Crossword;