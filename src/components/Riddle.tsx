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
  isSolved: boolean;
  setIsSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Riddle(props: RiddleProps) {
  const [timeToSolve, setTimeToSolve] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  
  
  const [isOvertime, setIsOvertime] = useState(false);
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
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isOvertime={isOvertime}
            setIsOvertime={setIsOvertime}
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
            value={riddleAnswer}
            onChange={(e) => {
              setRiddleAnswer(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();

              if (
                riddleAnswer.trim().toLowerCase() ===
                props.riddle.correctAnswer.trim().toLowerCase()
              ) {
                props.setIsSolved(true);

                alert(`Correct! Riddle solved in ${timeToSolve} seconds!`);
              } else {
                alert(`Incorrect! try again later`);
              }
              setRiddleAnswer("");
              setTimeToSolve(0);
              setTimeLeft(props.riddle.timeLimit);
              setIsOvertime(false);
            }}
          >
            Submit answer
          </button>
        </form>
      </div>
    </div>
  );
}
