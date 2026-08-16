import { useState } from "react";
import {
  sudokuPuzzle,
  sudokuSolution,
} from "./sudokuData";
import { supabase } from "../../lib/supabaseClient";

function Sudoku() {
  const [board, setBoard] = useState(
    sudokuPuzzle.map((row) => [...row])
  );

  const [selectedCell, setSelectedCell] =
    useState(null);

  const [message, setMessage] = useState("");

  const [score, setScore] = useState(null);

  const [playerName, setPlayerName] = useState("");

  const [scoreSaved, setScoreSaved] = useState(false);

  const [savingScore, setSavingScore] = useState(false);

  const handleCellClick = (row, col) => {
    if (sudokuPuzzle[row][col] !== 0) {
      return;
    }

    setSelectedCell({ row, col });
    setMessage("");
  };

  const enterNumber = (number) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    const updatedBoard = board.map((boardRow) => [
      ...boardRow,
    ]);

    updatedBoard[row][col] = number;

    setBoard(updatedBoard);
    setMessage("");
    setScore(null);
    setScoreSaved(false);
  };

  const clearCell = () => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;

    const updatedBoard = board.map((boardRow) => [
      ...boardRow,
    ]);

    updatedBoard[row][col] = 0;

    setBoard(updatedBoard);
    setScore(null);
    setScoreSaved(false);
  };

  const checkSudoku = () => {
    let correctCells = 0;
    let emptyCells = 0;

    board.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        // Only count cells the player had to fill
        if (sudokuPuzzle[rowIndex][colIndex] === 0) {
          emptyCells++;

          if (
            value === sudokuSolution[rowIndex][colIndex]
          ) {
            correctCells++;
          }
        }
      });
    });

    const calculatedScore = correctCells * 10;

    setScore(calculatedScore);

    const isCorrect = board.every(
      (row, rowIndex) =>
        row.every(
          (value, colIndex) =>
            value === sudokuSolution[rowIndex][colIndex]
        )
    );

    if (isCorrect) {
      setMessage(
        `Amazing! Sudoku queen! 👑🎀 Perfect score: ${calculatedScore} points!`
      );
    } else {
      setMessage(
        `${correctCells}/${emptyCells} cells correct. Score: ${calculatedScore} points. Keep solving! 💕`
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

    if (score === null) {
      setMessage(
        "Check your Sudoku first! ✦"
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
          game: "Sudoku",
          score: score,
        },
      ]);

    setSavingScore(false);

    if (error) {
      console.error(
        "Error saving Sudoku score:",
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
    setBoard(
      sudokuPuzzle.map((row) => [...row])
    );

    setSelectedCell(null);
    setMessage("");
    setScore(null);
    setPlayerName("");
    setScoreSaved(false);
  };

  return (
    <main className="sudoku-page">

      <section className="sudoku-header">

        <p className="game-label">
          PUZZLEPLAY • SUDOKU
        </p>

        <h1>
          Sudoku <span>♡</span>
        </h1>

        <p>
          Fill every row, column and box with numbers 1–9.
        </p>

      </section>

      <section className="sudoku-game">

        <div className="sudoku-board">

          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => {

              const original =
                sudokuPuzzle[rowIndex][colIndex] !== 0;

              const selected =
                selectedCell?.row === rowIndex &&
                selectedCell?.col === colIndex;

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${
                    original ? "original" : ""
                  } ${selected ? "selected" : ""}`}
                  onClick={() =>
                    handleCellClick(
                      rowIndex,
                      colIndex
                    )
                  }
                >
                  {value !== 0 ? value : ""}
                </button>
              );
            })
          )}

        </div>

        <div className="number-pad">

          {[
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
          ].map((number) => (
            <button
              key={number}
              onClick={() =>
                enterNumber(number)
              }
            >
              {number}
            </button>
          ))}

        </div>

        <div className="sudoku-actions">

          <button
            className="clear-button"
            onClick={clearCell}
          >
            Clear
          </button>

          <button
            className="check-button"
            onClick={checkSudoku}
          >
            Check Sudoku ✦
          </button>

          <button
            className="new-puzzle-button"
            onClick={newPuzzle}
          >
            New Puzzle
          </button>

        </div>

        {message && (
          <p className="sudoku-message">
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
              disabled={
                savingScore || scoreSaved
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

export default Sudoku;