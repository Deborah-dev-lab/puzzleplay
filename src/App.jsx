import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crossword from "./games/crossword/Crossword";
import Sudoku from "./games/sudoku/Sudoku";
import WordSearch from "./games/wordsearch/WordSearch";
import Scores from "./pages/Scores";

function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/wordsearch" element={<WordSearch />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </HashRouter>
  );
}

export default App;