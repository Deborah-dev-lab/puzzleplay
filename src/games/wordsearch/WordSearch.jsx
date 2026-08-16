import { useState } from "react";
import wordSearchCategories from "./wordSearchData";
import { supabase } from "../../lib/supabaseClient";

const GRID_SIZE = 12;

function createGrid(words) {
  const grid = Array.from(
    { length: GRID_SIZE },
    () => Array(GRID_SIZE).fill("")
  );

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  const canPlaceWord = (
    word,
    row,
    col,
    rowDirection,
    colDirection
  ) => {
    for (let i = 0; i < word.length; i++) {
      const newRow = row + rowDirection * i;
      const newCol = col + colDirection * i;

      if (
        newRow < 0 ||
        newRow >= GRID_SIZE ||
        newCol < 0 ||
        newCol >= GRID_SIZE
      ) {
        return false;
      }

      if (
        grid[newRow][newCol] !== "" &&
        grid[newRow][newCol] !== word[i]
      ) {
        return false;
      }
    }

    return true;
  };

  const placeWord = (word) => {
    for (let attempt = 0; attempt < 100; attempt++) {
      const direction =
        directions[
          Math.floor(
            Math.random() * directions.length
          )
        ];

      const row = Math.floor(
        Math.random() * GRID_SIZE
      );

      const col = Math.floor(
        Math.random() * GRID_SIZE
      );

      if (
        canPlaceWord(
          word,
          row,
          col,
          direction[0],
          direction[1]
        )
      ) {
        for (let i = 0; i < word.length; i++) {
          grid[
            row + direction[0] * i
          ][
            col + direction[1] * i
          ] = word[i];
        }

        return true;
      }
    }

    return false;
  };

  words.forEach((word) => {
    placeWord(word);
  });

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === "") {
        grid[row][col] =
          letters[
            Math.floor(
              Math.random() * letters.length
            )
          ];
      }
    }
  }

  return grid;
}

function WordSearch() {
  const [selectedCategory, setSelectedCategory] =
    useState(null);

  if (!selectedCategory) {
    return (
      <main className="wordsearch-page">

        <section className="wordsearch-header">

          <p className="game-label">
            PUZZLEPLAY • WORD SEARCH
          </p>

          <h1>
            Word Search <span>♡</span>
          </h1>

          <p>
            Pick a theme and find all the hidden words!
          </p>

        </section>

        <section className="wordsearch-category-grid">

          {wordSearchCategories.map(
            (category) => (
              <button
                key={category.id}
                className="wordsearch-category-card"
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                <div className="wordsearch-category-icon">
                  {category.icon}
                </div>

                <h2>{category.title}</h2>

                <p>{category.description}</p>

                <span>Play ✦</span>
              </button>
            )
          )}

        </section>

      </main>
    );
  }

  return (
    <WordSearchPuzzle
      category={selectedCategory}
      onBack={() =>
        setSelectedCategory(null)
      }
    />
  );
}

function WordSearchPuzzle({
  category,
  onBack,
}) {
  const [grid, setGrid] = useState(() =>
    createGrid(category.words)
  );

  const [selectedCells, setSelectedCells] =
    useState([]);

  const [foundWords, setFoundWords] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [score, setScore] =
    useState(0);

  const [playerName, setPlayerName] =
    useState("");

  const [scoreSaved, setScoreSaved] =
    useState(false);

  const [savingScore, setSavingScore] =
    useState(false);

  const selectCell = (row, col) => {
    const exists = selectedCells.some(
      (cell) =>
        cell.row === row &&
        cell.col === col
    );

    if (exists) {
      setSelectedCells(
        selectedCells.filter(
          (cell) =>
            !(
              cell.row === row &&
              cell.col === col
            )
        )
      );
    } else {
      setSelectedCells([
        ...selectedCells,
        { row, col },
      ]);
    }

    setMessage("");
  };

  const getSelectedWord = () => {
    return selectedCells
      .map(
        (cell) =>
          grid[cell.row][cell.col]
      )
      .join("");
  };

  const checkWord = () => {
    const selectedWord =
      getSelectedWord();

    const reversedWord =
      selectedWord
        .split("")
        .reverse()
        .join("");

    const matchingWord =
      category.words.find(
        (word) =>
          word === selectedWord ||
          word === reversedWord
      );

    if (!matchingWord) {
      setMessage(
        "That isn't one of the hidden words! Try again 💕"
      );

      setSelectedCells([]);

      return;
    }

    if (
      foundWords.includes(matchingWord)
    ) {
      setMessage(
        "You've already found that one! 🎀"
      );

      return;
    }

    const updatedFoundWords = [
      ...foundWords,
      matchingWord,
    ];

    const newScore =
      updatedFoundWords.length * 10;

    setFoundWords(
      updatedFoundWords
    );

    setScore(newScore);

    setSelectedCells([]);

    if (
      updatedFoundWords.length ===
      category.words.length
    ) {
      setMessage(
        `You found them all! Word Search queen! 👑🎀 Final score: ${newScore} points!`
      );
    } else {
      setMessage(
        `${matchingWord} found! +10 points ✦ Score: ${newScore}`
      );
    }
  };

  const saveScore = async () => {
    if (!playerName.trim()) {
      setMessage(
        "Please enter your name before saving your score. 🎀"
      );

      return;
    }

    if (score === 0) {
      setMessage(
        "Find at least one word before saving your score! ✦"
      );

      return;
    }

    if (scoreSaved) {
      setMessage(
        "Your score has already been saved! 🏆"
      );

      return;
    }

    setSavingScore(true);

    const { error } = await supabase
      .from("scores")
      .insert([
        {
          player_name: playerName.trim(),
          game: `Word Search - ${category.title}`,
          score: score,
        },
      ]);

    setSavingScore(false);

    if (error) {
      console.error(
        "Error saving Word Search score:",
        error
      );

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

  const newPuzzle = () => {
    setGrid(
      createGrid(category.words)
    );

    setSelectedCells([]);
    setFoundWords([]);
    setMessage("");
    setScore(0);
    setPlayerName("");
    setScoreSaved(false);
  };

  return (
    <main className="wordsearch-page">

      <section className="wordsearch-header">

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
          {category.title} Word Search{" "}
          <span>♡</span>
        </h1>

        <p>
          Click the letters that make up a word,
          then check your answer!
        </p>

      </section>

      <section className="wordsearch-game">

        <div className="wordsearch-score">
          <span>Score</span>
          <strong>{score}</strong>
          <small>/ {category.words.length * 10}</small>
        </div>

        <div className="wordsearch-board">

          {grid.map(
            (row, rowIndex) =>
              row.map(
                (letter, colIndex) => {

                  const isSelected =
                    selectedCells.some(
                      (cell) =>
                        cell.row ===
                          rowIndex &&
                        cell.col ===
                          colIndex
                    );

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      className={`wordsearch-cell ${
                        isSelected
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        selectCell(
                          rowIndex,
                          colIndex
                        )
                      }
                    >
                      {letter}
                    </button>
                  );
                }
              )
          )}

        </div>

        <div className="word-list">

          <h2>Find these ✦</h2>

          <div className="word-list-items">

            {category.words.map(
              (word) => (
                <span
                  key={word}
                  className={
                    foundWords.includes(word)
                      ? "found"
                      : ""
                  }
                >
                  {word}
                </span>
              )
            )}

          </div>

        </div>

        <div className="wordsearch-actions">

          <button
            className="check-button"
            onClick={checkWord}
          >
            Check Word ✦
          </button>

          <button
            className="new-puzzle-button"
            onClick={newPuzzle}
          >
            New Puzzle
          </button>

        </div>

        {message && (
          <p className="wordsearch-message">
            {message}
          </p>
        )}

        {foundWords.length > 0 && (
          <section className="score-save-box">

            <h2>
              Your Score: {score} 🏆
            </h2>

            <p>
              {foundWords.length} of{" "}
              {category.words.length} words found.
              Enter your name to save your score.
            </p>

            <input
              type="text"
              value={playerName}
              onChange={(event) =>
                setPlayerName(
                  event.target.value
                )
              }
              placeholder="Enter your name"
              maxLength={30}
            />

            <button
              className="check-button"
              onClick={saveScore}
              disabled={
                savingScore ||
                scoreSaved
              }
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

export default WordSearch;