import Header from "../components/Header";
import RiddleListItem from "../components/RiddleListItem";
import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import type { IRiddle } from "../interfaces/IRiddle";
import { useRiddles } from "../contexts/RiddlesContext";

function GameData() {
  const currentPlayerContext = useCurrentPlayer();
  const RiddlesContext = useRiddles();

  return (
    <div>
      <Header
        headerText={
          currentPlayerContext.currentPlayer?.role.toUpperCase() ?? "Game data"
        }
        btnText="Light/Dark mode"
      />
      <div className="riddle_List">
        {(RiddlesContext.riddles ?? []).map((riddle: IRiddle, idx: number) => (
          <RiddleListItem
            key={idx}
            _id={riddle._id}
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
