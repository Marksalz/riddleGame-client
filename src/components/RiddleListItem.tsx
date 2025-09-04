import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import type { IRiddle } from "../interfaces/IRiddle";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/URL";

// export interface RiddleListItemProps {
//   name: string;
//   taskDescription: string;
//   difficulty: string;
//   timeLimit: number;
//   hint: string;
//   choices: string[];
// }

export default function RiddleListItem({
  id,
  name,
  taskDescription,
  correctAnswer,
  difficulty,
  timeLimit,
  hint,
  choices,
}: IRiddle) {
  const currentPlayerContext = useCurrentPlayer();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id,
    name,
    taskDescription,
    difficulty,
    timeLimit,
    hint,
    correctAnswer,
  });

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeLimit" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updateRiddle = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/riddles/update_riddle/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update riddle");
        await res.json();
        setIsEditing(false);
      } catch (err: any) {
        alert("Error updating riddle: " + err.message);
      }
    };
    updateRiddle();
  };

  return (
    <div className="riddle-list-container">
      <div className="riddle-list-item">
        {!isEditing ? (
          <>
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
            <p className="riddle-list-item-correctAnswer">
              <strong>Correct Answer:</strong> {correctAnswer}
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
          </>
        ) : (
          <form
            className="update-riddle-form"
            onSubmit={handleSubmit}
            style={{ marginTop: "1rem" }}
          >
            <label htmlFor="name">Riddle Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Riddle Name"
              required
            />
            <label htmlFor="taskDescription">Task Description:</label>
            <input
              id="taskDescription"
              type="text"
              name="taskDescription"
              value={formData.taskDescription}
              onChange={handleChange}
              placeholder="Task Description"
              required
            />
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              id="difficulty"
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              placeholder="Difficulty"
              required
            />
            <label htmlFor="timeLimit">Time Limit (seconds):</label>
            <input
              id="timeLimit"
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleChange}
              placeholder="Time Limit (seconds)"
              required
            />
            <label htmlFor="hint">Hint:</label>
            <input
              id="hint"
              type="text"
              name="hint"
              value={formData.hint}
              onChange={handleChange}
              placeholder="Hint"
            />
            <label htmlFor="correctAnswer">Correct Answer:</label>
            <input
              id="correctAnswer"
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Correct Answer"
              required
            />
            <button type="submit">Update Riddle</button>
            <button
              type="button"
              onClick={handleCancelClick}
              style={{ marginLeft: "0.5rem" }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      {currentPlayerContext.currentPlayer?.role === "admin" && !isEditing && (
        <aside className="riddle-list-btns">
          <button onClick={handleEditClick}>Edit riddle</button>
          <button className="delete_btn">Delete riddle</button>
        </aside>
      )}
    </div>
  );
}
