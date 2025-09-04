import { useCurrentPlayer } from "../contexts/CurrentPlayerContext";
import type { IRiddle } from "../interfaces/IRiddle";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/URL";
import { useRiddles } from "../contexts/RiddlesContext";
import { deleteRiddle, fetchRiddles } from "../services/riddleService";

export default function RiddleListItem({
  _id,
  name,
  taskDescription,
  correctAnswer,
  difficulty,
  timeLimit,
  hint,
  choices,
}: IRiddle) {
  const currentPlayerContext = useCurrentPlayer();
  const RiddlesContext = useRiddles();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id,
    name,
    taskDescription,
    difficulty,
    timeLimit,
    hint,
    correctAnswer,
  });

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleDeleteClick = async () => {
    try {
      await deleteRiddle(_id);
      const updatedRiddles = await fetchRiddles();
      RiddlesContext.setRiddles(updatedRiddles);
      alert("Riddle deleted successfully!");
    } catch (err: any) {
      alert("Error deleting riddle: " + err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "timeLimit" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/riddles/update_riddle/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update riddle");
      await res.json();
      setIsEditing(false);
      // Fetch updated riddles and update context
      const updatedRiddles = await fetchRiddles();
      RiddlesContext.setRiddles(updatedRiddles);
      alert("Riddle updated successfully!");
    } catch (err: any) {
      alert("Error updating riddle: " + err.message);
    }
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
            <div className="riddle-list-item">
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
            </div>
            <div className="riddle-update-btns">
              <button type="submit">Update Riddle</button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {currentPlayerContext.currentPlayer?.role === "admin" && !isEditing && (
        <aside className="riddle-list-btns">
          <button onClick={handleEditClick}>Edit riddle</button>
          <button onClick={handleDeleteClick} className="delete_btn">
            Delete riddle
          </button>
        </aside>
      )}
    </div>
  );
}
