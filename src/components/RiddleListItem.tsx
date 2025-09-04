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
    <div
      className="riddle-list-item"
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{name}</h3>
      <p style={{ margin: "0 0 8px 0" }}>
        <strong>Riddle:</strong> {taskDescription}
      </p>
      <p style={{ margin: "0 0 8px 0" }}>
        <strong>Difficulty:</strong> {difficulty}
      </p>
      <p style={{ margin: "0 0 8px 0" }}>
        <strong>Time Limit:</strong> {timeLimit} seconds
      </p>
      <p style={{ margin: "0" }}>
        <strong>Hint:</strong> {hint}
      </p>
      {choices && choices.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <strong>Choices:</strong>
          <ul style={{ margin: "4px 0 0 16px" }}>
            {choices.map((choice, idx) => (
              <li key={idx}>{choice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
