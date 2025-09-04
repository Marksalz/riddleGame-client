import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import GamePage from "./pages/GamePage";
import GameData from "./pages/GameData";
import LeaderboardPage from "./pages/LeaderboardPage";
import { CurrentPlayerProvider } from "./contexts/CurrentPlayerContext";
import { RiddlesProvider } from "./contexts/RiddlesContext";

function App() {
  return (
    <RiddlesProvider>
      <CurrentPlayerProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/game_data" element={<GameData />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </BrowserRouter>
      </CurrentPlayerProvider>
    </RiddlesProvider>
  );
}

export default App;
