import { Link } from "react-router";
import Timer from "./Timer";
import { useState } from "react";

type RiddleProps = {
  riddle: {
    taskDescription: string;
    difficulty: string;
    timeLimit: number;
    correctAnswer: string;
  };
};

export default function Riddle(props: RiddleProps) {
  const [timeToSolve, setTimeToSolve] = useState(0);
  let riddleAnswer = "";
  return (
    <div>
      <section className="riddle_info_bar">
        <Link className="riddle_info_bar_item home_link" to="/">
          Home
        </Link>
        <p className="riddle_info_bar_item">{`Level: ${props.riddle.difficulty}`}</p>
        <p className="riddle_info_bar_item">{`Time Limit: ${props.riddle.timeLimit} seconds`}</p>
        <div className="riddle_info_bar_item">
          <Timer
            finalTime={timeToSolve}
            setFinalTime={setTimeToSolve}
            timeLimit={props.riddle.timeLimit}
          />
        </div>
      </section>
      <div className="riddle_container">
        <form className="riddle" action="">
          <label htmlFor="">{props.riddle.taskDescription}</label>
          <input
            type="text"
            name="answer"
            placeholder="write answer here"
            onChange={(e) => {
              riddleAnswer = e.target.value;
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (
                riddleAnswer.trim().toLowerCase() ===
                props.riddle.correctAnswer.trim().toLowerCase()
              ) {
                alert(`Correct! Riddle solved in ${timeToSolve} seconds!`);
              } else {
                alert(`Incorrect! try again later`);
              }
            }}
          >
            Submit answer
          </button>
        </form>
      </div>
    </div>
  );
}
