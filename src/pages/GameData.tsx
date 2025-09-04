import Header from "../components/Header";
import RiddleListItem from "../components/RiddleListItem";
import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import { useEffect } from "react";
import { BASE_URL } from "../utils/URL";
import { useState } from "react";
import type { IRiddle } from "../interfaces/IRiddle";

function GameData() {
  const currentPlayerContext = useCurrentPlayer();
  const [riddles, setRiddles] = useState<IRiddle[]>([]);

  useEffect(() => {
    const fetchRiddles = async () => {
      const res = await fetch(`${BASE_URL}/api/riddles/read_all_riddles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setRiddles(data);
    };
    fetchRiddles();
  }, []);

  return (
    <div>
      <Header
        headerText={
          currentPlayerContext.currentPlayer?.role.toUpperCase() ?? "Game data"
        }
        btnText="Light/Dark mode"
      />
      <div className="riddle_List">
        {riddles.map((riddle: IRiddle, idx: number) => (
          <RiddleListItem
            key={idx}
            name={riddle.name}
            taskDescription={riddle.taskDescription}
            correctAnswer={riddle.correctAnswer}
            difficulty={riddle.difficulty}
            timeLimit={riddle.timeLimit}
            hint={riddle.hint}
            choices={riddle.choices}
          />
        ))}
      </div>
    </div>
  );
}

export default GameData;
