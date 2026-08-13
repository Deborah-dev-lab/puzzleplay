import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crossword from "./games/crossword/Crossword";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
