import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="GamePage" element={<GamePage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
