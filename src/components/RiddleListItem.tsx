export interface RiddleListItemProps {
  name: string;
  taskDescription: string;
  difficulty: string;
  timeLimit: number;
  hint: string;
  choices: string[];
}

export default function RiddleListItem({
  name,
  taskDescription,
  difficulty,
  timeLimit,
  hint,
  choices,
}: RiddleListItemProps) {
  return (
    <div className="riddle-list-item">
      <h3 className="riddle-list-item-title">{name}</h3>
      <p className="riddle-list-item-desc">
        <strong>Riddle:</strong> {taskDescription}
      </p>
      <p className="riddle-list-item-difficulty">
        <strong>Difficulty:</strong> {difficulty}
      </p>
      <p className="riddle-list-item-timelimit">
        <strong>Time Limit:</strong> {timeLimit} seconds
      </p>
      <p className="riddle-list-item-hint">
        <strong>Hint:</strong> {hint}
      </p>
      {choices && choices.length > 0 && (
        <div className="riddle-list-item-choices">
          <strong>Choices:</strong>
          <ul className="riddle-list-item-choices-list">
            {choices.map((choice, idx) => (
              <li key={idx}>{choice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
