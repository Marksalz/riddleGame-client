import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import type { IRiddle } from "../interfaces/IRiddle";

// export interface RiddleListItemProps {
//   name: string;
//   taskDescription: string;
//   difficulty: string;
//   timeLimit: number;
//   hint: string;
//   choices: string[];
// }

export default function RiddleListItem(riddle: IRiddle) {
  const currentPlayerContext = useCurrentPlayer();
  return (
    <div className="riddle-list-container">
      <div className="riddle-list-item">
        <h3 className="riddle-list-item-title">{riddle.name}</h3>
        <p className="riddle-list-item-desc">
          <strong>Riddle:</strong> {riddle.taskDescription}
        </p>
        <p className="riddle-list-item-difficulty">
          <strong>Difficulty:</strong> {riddle.difficulty}
        </p>
        <p className="riddle-list-item-timelimit">
          <strong>Time Limit:</strong> {riddle.timeLimit} seconds
        </p>
        <p className="riddle-list-item-correctAnswer">
          <strong>Correct Answer:</strong> {riddle.correctAnswer}
        </p>
        <p className="riddle-list-item-hint">
          <strong>Hint:</strong> {riddle.hint}
        </p>
        {riddle.choices && riddle.choices.length > 0 && (
          <div className="riddle-list-item-choices">
            <strong>Choices:</strong>
            <ul className="riddle-list-item-choices-list">
              {riddle.choices.map((choice, idx) => (
                <li key={idx}>{choice}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {currentPlayerContext.currentPlayer?.role === "admin" && (
        <aside className="riddle-list-btns">
          <button>Edit riddle</button>
          <button className="delete_btn">Delete riddle</button>
        </aside>
      )}
    </div>
  );
}
