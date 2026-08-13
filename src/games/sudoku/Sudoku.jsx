import { useState } from "react";
import { sudokuPuzzle, sudokuSolution } from "./sudokuData";

function Sudoku() {
  const [board, setBoard] = useState(
    sudokuPuzzle.map((row) => [...row])
  );

  const [selectedCell, setSelectedCell] = useState(null);
  const [message, setMessage] = useState("");

  const handleNumberClick = (number) => {
    if (!selectedCell) {
      return;
    }

    const { row, col } = selectedCell;

    if (sudokuPuzzle[row][col] !== 0) {
      return;
    }

    const newBoard = board.map((currentRow) => [
      ...currentRow,
    ]);

    newBoard[row][col] = number;

    setBoard(newBoard);
    setMessage("");
  };

  const handleClear = () => {
    if (!selectedCell) {
      return;
    }

    const { row, col } = selectedCell;

    if (sudokuPuzzle[row][col] !== 0) {
      return;
    }

    const newBoard = board.map((currentRow) => [
      ...currentRow,
    ]);

    newBoard[row][col] = 0;

    setBoard(newBoard);
    setMessage("");
  };

  const checkSudoku = () => {
    const isComplete = board.every((row) =>
      row.every((cell) => cell !== 0)
    );

    if (!isComplete) {
      setMessage(
        "Keep going, girlie! Fill in all the squares first 💕"
      );
      return;
    }

    const isCorrect = board.every((row, rowIndex) =>
      row.every(
        (cell, colIndex) =>
          cell === sudokuSolution[rowIndex][colIndex]
      )
    );

    if (isCorrect) {
      setMessage(
        "You solved it! Sudoku queen! 👑🎀"
      );
    } else {
      setMessage(
        "Almost! Some numbers need a little fixing 💕"
      );
    }
  };

  const newPuzzle = () => {
    setBoard(
      sudokuPuzzle.map((row) => [...row])
    );
    setSelectedCell(null);
    setMessage("");
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
          Fill the grid and show off those puzzle skills!
        </p>
      </section>

      <section className="sudoku-game">
        <div className="sudoku-board">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isGiven =
                sudokuPuzzle[rowIndex][colIndex] !== 0;

              const isSelected =
                selectedCell?.row === rowIndex &&
                selectedCell?.col === colIndex;

              return (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={`sudoku-cell ${
                    isGiven ? "given" : "editable"
                  } ${isSelected ? "selected" : ""}`}
                  onClick={() =>
                    setSelectedCell({
                      row: rowIndex,
                      col: colIndex,
                    })
                  }
                >
                  {cell !== 0 ? cell : ""}
                </button>
              );
            })
          )}
        </div>

        <div className="number-pad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
            (number) => (
              <button
                key={number}
                onClick={() =>
                  handleNumberClick(number)
                }
              >
                {number}
              </button>
            )
          )}

          <button
            className="clear-number"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="sudoku-actions">
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
      </section>
    </main>
  );
}

export default Sudoku;