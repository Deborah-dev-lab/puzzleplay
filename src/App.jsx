import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crossword from "./games/crossword/Crossword";
import Sudoku from "./games/sudoku/Sudoku";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/crossword"
          element={<Crossword />}
        />

        <Route
          path="/sudoku"
          element={<Sudoku />}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
