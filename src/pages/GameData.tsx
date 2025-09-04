import Header from "../components/Header";
import RiddleListItem, {
  type RiddleListItemProps,
} from "../components/RiddleListItem";
import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import { useEffect } from "react";
import { BASE_URL } from "../utils/URL";

function GameData() {
  const currentPlayerContext = useCurrentPlayer();
  const url = BASE_URL;
  let riddles: any = [];

  useEffect(() => {
    const fetchRiddles = async () => {
      const res = await fetch(`${url}/api/riddles/read_all_riddles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      riddles = await res.json();
    };
    fetchRiddles();
  }, []);

  return (
    <div>
      <Header
        headerText={currentPlayerContext.currentPlayer?.role ?? "Game data"}
        btnText="Light/Dark mode"
      />
      <div className="riddle_List">
        {riddles.map((riddle: RiddleListItemProps, idx: number) => (
          <RiddleListItem
            key={idx}
            name={riddle.name}
            taskDescription={riddle.taskDescription}
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
